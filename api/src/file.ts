import fs from 'fs';
import url from 'url';
import mime from 'mime';
import path from 'path';
import { RequestListener } from 'http';

const file: RequestListener = (request, response) => {
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
        'Content-Type': mime.lookup(filename)
      });

      response.write(file, 'binary');

      response.end();
    });
  });
};

export default file;
