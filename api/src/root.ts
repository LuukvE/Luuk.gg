import { RequestListener } from 'http';
import github from './github';
import slack, { setupSlack } from './slack';
import file from './file';

const protocol = process.env.HTTPS_PORT ? 'https://' : 'http://';

const clientOrigin = `${protocol}${process.env.CLIENT_DOMAIN}`;

export const httpHandler: RequestListener = async (request, response) => {
  if (!request.headers.host || request.headers.host.indexOf(process.env.API_DOMAIN) !== 0) {
    return file(request, response);
  }

  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', clientOrigin);
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

    if (request.url === '/slack') return setupSlack(request, response, body);

    response.writeHead(404);

    response.end();
  });
};

export const wsHandler = slack;
