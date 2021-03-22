import fs from 'fs';
import url from 'url';
import mime from 'mime';
import path from 'path';
import https from 'https';
import dotenv from 'dotenv';
import http, { RequestListener } from 'http';

import github from './github';

dotenv.config();

const getFile: RequestListener = (request, response) => {
  const uri = url.parse(request.url).pathname;

  let filename = path.join(__dirname, '..', '..', 'client', 'build', path.resolve('/', uri));

  fs.access(filename, fs.constants.R_OK, (err) => {
    if (err) filename = path.join(__dirname, '..', '..', 'client', 'build', 'index.html');

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, 'binary', (err, file) => {
      if (err) {
        response.writeHead(500, {
          'Content-Type': 'text/plain'
        });

        response.write(err + '\n');

        return response.end();
      }

      response.writeHead(200, {
        'Content-Type': mime.getType(filename)
      });

      response.write(file, 'binary');

      response.end();
    });
  });
};

const handler: RequestListener = async (request, response) => {
  console.log(request.headers.host);

  if (!request.headers.host || request.headers.host.indexOf('api.luuk.gg') === 0) {
    return getFile(request, response);
  }

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

if (process.env.HTTPS_PORT) {
  const certPath = '../ssl';

  http
    .createServer((request, response) => {
      response.writeHead(302, { Location: `https://${process.env.CLIENT_DOMAIN}${request.url}` });
      response.end();
    })
    .listen(process.env.HTTP_PORT);

  https
    .createServer(
      {
        key: fs.readFileSync(`${certPath}/privkey.pem`, 'utf8'),
        cert: fs.readFileSync(`${certPath}/cert.pem`, 'utf8'),
        ca: fs.readFileSync(`${certPath}/chain.pem`, 'utf8')
      },
      handler
    )
    .listen(process.env.HTTPS_PORT);

  console.log(`Hosting API at https://${process.env.API_DOMAIN}:${process.env.HTTPS_PORT}`);
} else {
  http.createServer(handler).listen(process.env.HTTP_PORT);

  console.log(`Hosting API at http://${process.env.API_DOMAIN}:${process.env.HTTP_PORT}`);
}
