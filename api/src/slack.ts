import { IncomingMessage, ServerResponse } from 'http';
import fetch from 'node-fetch';
import WebSocket from 'ws';

import { SlackMessage, SlackEvent, WebsocketMessage } from './types';

// Store client sockets in this array
const sockets: WebSocket[] = [];

// A queue of functions used between the HTTP and WebSocket handlers
// After the WebSocket handler sends a message to Slack the HTTP handler reads it
// The WebSocket needs to know the Slack Thread the HTTP handler sees on the message
const setThreadQueue: ((slackThread: string) => void)[] = [];

// Functions to send messages to the web client are stored based on thread ID
const threads: { [thread: string]: (message: WebsocketMessage) => void } = {};

// Determines whether to show a green or grey circle next to my image
const status = {
  online: false
};

// HTTP handler for Slack Events
export const slackEvent = async (
  request: IncomingMessage,
  response: ServerResponse,
  body: { event: SlackEvent }
) => {
  response.writeHead(200);

  // To set up this webhook, you need to uncomment this
  // Slack will then verify you are in control of this API
  // response.end(JSON.stringify({ challenge: body.challenge }));

  // The Slack Event is received, so we can close the WebHook request
  response.end();

  // If a bot has sent a message directly to the channel, without a thread
  // Then this thread will be started in the replies to this message
  // setThread lets the WebSocket handler know what thread to send messages to
  if (body.event.subtype === 'bot_message' && !body.event.thread_ts) {
    const setThread = setThreadQueue.pop();

    if (setThread) setThread(body.event.ts);
  }

  // Catch any non-text events from Slack
  if (!body.event.text) {
    if (['message_changed', 'message_deleted'].includes(body.event.subtype)) return;

    // Log unexpected events
    return console.log('Unexpected Slack Event', body.event);
  }

  // When a user writes "Good morning" or "Good night" in the channel, the online indicator is updated
  if (
    body.event.subtype !== 'bot_message' &&
    !body.event.thread_ts &&
    ['good morning', 'good night'].includes(body.event.text.toLowerCase())
  ) {
    status.online = body.event.text.toLowerCase() === 'good morning';

    // All connected sockets are sent the new online status
    sockets.forEach((ws) => {
      if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(status));
    });

    // The bot responds to the user who wrote the message
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

  // Find the function to send a message to the web client based on the thread of this message
  const respond = threads[body.event.thread_ts || body.event.ts];

  // Only proceed if the function exists
  if (!respond) return;

  // Send the message the Slack API just sent over the HTTP WebHook to the web client
  respond({
    text: body.event.text,
    date: new Date().toJSON(),
    sender: body.event.subtype === 'bot_message' ? 'You' : 'Luuk'
  });
};

// WebSocket handler for web clients
export const slackWebsocket = (ws: WebSocket) => {
  // Every client is bound to a single Slack thread from the moment they connect
  let thread = '';

  // Add the socket to a list of sockets used to broadcast online status
  sockets.push(ws);

  // Send the current online status to the web client
  ws.send(JSON.stringify(status));

  // Keep checking the WebSocket connection
  const interval = setInterval(() => {
    // If it is still open or connecting, check again later
    if ([ws.OPEN, ws.CONNECTING].includes(ws.readyState)) return;

    // If it is closing or closed, stop checking
    clearInterval(interval);

    // Delete the function to send messages to this socket based on Slack thread ID
    if (thread) delete threads[thread];

    // Find the socket in the list of sockets used to broadcast online status
    const index = sockets.findIndex((socket) => socket === ws);

    // Remove the socket from the list
    if (index > -1) sockets.splice(index, 1);
  }, 1000);

  // When a message is received from the client
  ws.on('message', async (body) => {
    const { text } = JSON.parse(body.toString());

    // Create a message to send to Slack
    const message: SlackMessage = {
      channel: process.env.channel,
      mrkdwn: true,
      text
    };

    // If this web client is already bound to a thread, link the message to it
    if (thread) {
      message.thread_ts = thread;
    } else {
      // Add a function to the queue of threads the HTTP handler can execute
      setThreadQueue.unshift((slackThread) => {
        // Update the client-specific thread variable inside the WebSocket
        thread = slackThread;

        // Connect the function to send messages to this web client based on thread
        threads[thread] = (message: WebsocketMessage) => {
          // If the socket has closed, delete the function
          if (ws.readyState !== ws.OPEN) return delete threads[thread];

          ws.send(JSON.stringify(message));
        };
      });
    }

    // Send the message to Slack
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
