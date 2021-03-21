import http, { RequestListener } from 'http';
import dotenv from 'dotenv';

import github from './github';

dotenv.config();

console.log(process.env.GITHUB_ACCESS_TOKEN, 22);

const handler: RequestListener = async (request, response) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': request.headers.Origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
  };

  if (request.method === 'OPTIONS') {
    response.writeHead(200, headers);

    return response.end();
  }

  const chunks: string[] = [];

  request.on('data', (chunk: Buffer | string) => {
    if (chunk instanceof Buffer) return; // this API only allows JSON

    chunks.push(chunk);
  });

  request.on('end', () => {
    const body = chunks.length ? JSON.parse(chunks.join('')) : null;

    if(request.url === '/github') return github(request, response, body);

    response.writeHead(404, headers);

    response.end();
  });
};

http.createServer(handler).listen(process.env.HTTP_PORT);

console.log(`Hosting API at http://localhost:${process.env.HTTP_PORT}`);
