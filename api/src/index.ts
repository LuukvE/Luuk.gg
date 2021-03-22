import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

import root from './root';

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
      root
    )
    .listen(process.env.HTTPS_PORT);

  console.log(`Hosting API at https://${process.env.API_DOMAIN}:${process.env.HTTPS_PORT}`);
} else {
  http.createServer(root).listen(process.env.HTTP_PORT);

  console.log(`Hosting API at http://${process.env.API_DOMAIN}:${process.env.HTTP_PORT}`);
}
