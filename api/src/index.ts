import fs from 'fs';
import https from 'https';
import WebSocket from 'ws';
import dotenv from 'dotenv';
import http, { Server } from 'http';

// Load the .env file into environment variables
dotenv.config();

import { httpHandler, wsHandler } from './root';

let server: Server | null = null;

// If HTTPS_PORT is defined in the .env file
if (process.env.HTTPS_PORT) {
  // Redirect all traffic from HTTP to HTTPS
  http
    .createServer((request, response) => {
      response.writeHead(302, { Location: `https://${process.env.CLIENT_DOMAIN}${request.url}` });
      response.end();
    })
    .listen(process.env.HTTP_PORT);

  // Host the API using SSL certificates from the ../ssl folder, ignored by Git
  const certPath = '../ssl';

  server = https
    .createServer(
      {
        key: fs.readFileSync(`${certPath}/privkey.pem`, 'utf8'),
        cert: fs.readFileSync(`${certPath}/cert.pem`, 'utf8'),
        ca: fs.readFileSync(`${certPath}/chain.pem`, 'utf8')
      },
      httpHandler
    )
    .listen(process.env.HTTPS_PORT);

  console.log(`API: https://${process.env.API_DOMAIN}:${process.env.HTTPS_PORT}`);
} else {
  // If no HTTPS_PORT is defined, only host a HTTP server
  server = http.createServer(httpHandler).listen(process.env.HTTP_PORT);

  console.log(`API: http://${process.env.API_DOMAIN}:${process.env.HTTP_PORT}`);
}

// Enable WebSockets on this server
const wss = new WebSocket.Server({ server });

wss.on('connection', wsHandler);
