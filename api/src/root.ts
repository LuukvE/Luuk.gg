import { RequestListener } from 'http';

import file from './file';
import github from './github';
import twilio from './twilio';
import graphql from './graphql';
import { awsUpload, awsSave } from './aws';
import { slackWebsocket, slackEvent } from './slack';
import { googleRedirect, googleAuthenticate, googleSignout } from './google';

const protocol = process.env.HTTPS_PORT ? 'https://' : 'http://';

const clientOrigin = `${protocol}${process.env.CLIENT_DOMAIN}`;

// Handle all HTTP requests for both client and API
export const httpHandler: RequestListener = async (request, response) => {
  // If the request is not made to the API domain, handle it like a static request for a client file
  if (!request.headers.host || request.headers.host.indexOf(process.env.API_DOMAIN) !== 0) {
    return file(request, response);
  }

  // All API responses are always CORS-enabled with JSON content type
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', clientOrigin);
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

  // Pre-flight requests do not need to be processed any further, they only need the CORS headers
  if (request.method === 'OPTIONS') {
    response.writeHead(200);

    return response.end();
  }

  // Load any data sent in the request body
  let chunks = '';

  request.on('data', (chunk: Buffer | string) => {
    chunks += chunk;
  });

  request.on('end', () => {
    // If there was a request body, parse the combined raw data chunks
    let body: any = null;

    try {
      body = chunks.length ? JSON.parse(chunks) : null;
    } catch (e) {
      console.log('JSON parse error of request body', chunks);
    }

    // Route requests to their handlers
    if (request.url === '/github') return github(request, response);

    if (request.url === '/twilio') return twilio(request, response, body);

    if (request.url === '/graphql') return graphql(request, response, body);

    if (request.url === '/signin') return googleRedirect(request, response);

    if (request.url === '/signout') return googleSignout(request, response);

    if (request.url === '/slack') return slackEvent(request, response, body);

    if (request.url === '/upload') return awsUpload(request, response, body);

    if (request.url === '/save-recipes') return awsSave(request, response, body);

    if (request.url === '/authenticate') return googleAuthenticate(request, response, body);

    response.writeHead(404);

    response.end();
  });
};

// The WebSocket is hooked up to the Slack module
export const wsHandler = slackWebsocket;
