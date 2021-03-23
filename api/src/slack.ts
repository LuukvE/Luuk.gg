import { IncomingMessage, ServerResponse } from 'http';
import fetch from 'node-fetch';
import WebSocket from 'ws';

import { RequestBody, SlackMessage, SlackEvent, WebsocketMessage } from './types';

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

  const respond = threads[body.event.thread_ts || body.event.ts];

  if (!respond) return;

  respond({
    text: body.event.text,
    date: new Date().toJSON(),
    sender: body.event.subtype === 'bot_message' ? 'You' : 'Luuk'
  });
};

const writeToSlack = async (message: SlackMessage) => {
  return await fetch(process.env.SLACK_HOOK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });
};

const setThreadQueue: ((slackThread: string) => void)[] = [];

const threads: { [thread: string]: (message: WebsocketMessage) => void } = {};

export default (ws: WebSocket) => {
  let thread = '';

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
          ws.send(JSON.stringify(message));
        };
      });
    }

    const res = await writeToSlack(message);

    if (res.status >= 300) return console.log('Slack hook error');
  });
};
