import { RequestListener } from 'http';

import file from './file';
import github from './github';
import twilio from './twilio';
import { slackWebsocket, slackEvent } from './slack';
import { googleRedirect, googleAuthenticate, googleSignout } from './google';

const protocol = process.env.HTTPS_PORT ? 'https://' : 'http://';

const clientOrigin = `${protocol}${process.env.CLIENT_DOMAIN}`;

export const httpHandler: RequestListener = async (request, response) => {
  if (!request.headers.host || request.headers.host.indexOf(process.env.API_DOMAIN) !== 0) {
    return file(request, response);
  }

  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', clientOrigin);
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

  if (request.method === 'OPTIONS') {
    response.writeHead(200);

    return response.end();
  }

  let chunks = '';

  request.on('data', (chunk: Buffer | string) => {
    chunks += chunk;
  });

  request.on('end', () => {
    let body: any = null;

    try {
      body = chunks.length ? JSON.parse(chunks) : null;
    } catch (e) {
      console.log('JSON parse error of request body', chunks);
    }

    if (request.url === '/github') return github(request, response);

    if (request.url === '/twilio') return twilio(request, response, body);

    if (request.url === '/slack') return slackEvent(request, response, body);

    if (request.url === '/signin') return googleRedirect(request, response);

    if (request.url === '/signout') return googleSignout(request, response);

    if (request.url === '/authenticate') return googleAuthenticate(request, response, body);

    response.writeHead(404);

    response.end();
  });
};

export const wsHandler = slackWebsocket;
