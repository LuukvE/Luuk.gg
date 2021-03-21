import http, { RequestListener } from 'http';
import dotenv from 'dotenv';

import github from './github';

dotenv.config();

console.log(process.env.GITHUB_ACCESS_TOKEN, 22);

const handler: RequestListener = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', request.headers.Origin || '*');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

  if (request.method === 'OPTIONS') {
    response.writeHead(200);

    return response.end();
  }

  const chunks: string[] = [];

  request.on('data', (chunk: Buffer | string) => {
    if (chunk instanceof Buffer) return; // this API only allows JSON

    chunks.push(chunk);
  });

  request.on('end', () => {
    const body = chunks.length ? JSON.parse(chunks.join('')) : null;

    if (request.url === '/github') return github(request, response, body);

    response.writeHead(404);

    response.end();
  });
};

http.createServer(handler).listen(process.env.HTTP_PORT);

console.log(`Hosting API at http://localhost:${process.env.HTTP_PORT}`);
