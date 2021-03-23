import { App } from '@slack/bolt';
import fetch from 'node-fetch';
import WebSocket from 'ws';

import { SlackMessage, SlackEvent, WebsocketMessage } from './types';

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

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.start();

app.event('message', async ({ event }) => {
  const e = event as SlackEvent;

  if (e.subtype === 'bot_message' && !e.thread_ts) {
    const setThread = setThreadQueue.pop();

    if (setThread) setThread(event.ts);
  }

  const respond = threads[e.thread_ts || e.ts];

  if (!respond) return;

  respond({
    text: e.text,
    date: new Date().toJSON(),
    sender: e.subtype === 'bot_message' ? 'You' : 'Luuk'
  });
});

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
