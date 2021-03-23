import { IncomingMessage, ServerResponse } from 'http';
import fetch from 'node-fetch';
import WebSocket from 'ws';

import { SlackMessage, SlackEvent, WebsocketMessage } from './types';

const sockets: WebSocket[] = [];

const setThreadQueue: ((slackThread: string) => void)[] = [];

const threads: { [thread: string]: (message: WebsocketMessage) => void } = {};

const status = {
  online: false
};

export const slackEvent = async (
  request: IncomingMessage,
  response: ServerResponse,
  body: { event: SlackEvent }
) => {
  response.writeHead(200);

  // used for setup:
  // response.end(JSON.stringify({ challenge: body.challenge }));

  response.end();

  if (body.event.subtype === 'bot_message' && !body.event.thread_ts) {
    const setThread = setThreadQueue.pop();

    if (setThread) setThread(body.event.ts);
  }

  if (!body.event.text) {
    if (body.event.subtype === 'message_deleted') return;

    return console.log('weird event', body.event);
  }

  if (
    body.event.subtype !== 'bot_message' &&
    !body.event.thread_ts &&
    ['good morning', 'good night'].includes(body.event.text.toLowerCase())
  ) {
    status.online = body.event.text.toLowerCase() === 'good morning';

    sockets.forEach((ws) => {
      if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(status));
    });

    return await fetch(process.env.SLACK_HOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channel: process.env.channel,
        mrkdwn: false,
        text: `Good ${status.online ? 'morning' : 'night'}, Luuk!`,
        thread_ts: body.event.ts
      })
    });
  }

  const respond = threads[body.event.thread_ts || body.event.ts];

  if (!respond) return;

  respond({
    text: body.event.text,
    date: new Date().toJSON(),
    sender: body.event.subtype === 'bot_message' ? 'You' : 'Luuk'
  });
};

export default (ws: WebSocket) => {
  let thread = '';

  sockets.push(ws);

  ws.send(JSON.stringify(status));

  const interval = setInterval(() => {
    if ([ws.OPEN, ws.CONNECTING].includes(ws.readyState)) return;

    clearInterval(interval);

    if (thread) delete threads[thread];

    const index = sockets.findIndex((socket) => socket === ws);

    if (index > -1) sockets.splice(index, 1);
  }, 1000);

  ws.on('message', async (body) => {
    const { text } = JSON.parse(body.toString());

    const message: SlackMessage = {
      channel: process.env.channel,
      mrkdwn: true,
      text
    };

    if (thread) {
      message.thread_ts = thread;
    } else {
      setThreadQueue.unshift((slackThread) => {
        thread = slackThread;

        threads[thread] = (message: WebsocketMessage) => {
          if (ws.readyState !== ws.OPEN) return delete threads[thread];

          ws.send(JSON.stringify(message));
        };
      });
    }

    const res = await fetch(process.env.SLACK_HOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });

    if (res.status >= 300) return console.log('Slack hook error');
  });
};
