import fs from 'fs';
import mime from 'mime';
import path from 'path';
import { URL } from 'url';
import { RequestListener } from 'http';

// Load a static file from inside the "../../client/build" folder
const file: RequestListener = (request, response) => {
  const uri = new URL(request.url, `https://${process.env.CLIENT_DOMAIN}`).pathname;

  // Construct the file path on our local drive
  let filename = path.join(__dirname, '..', '..', 'client', 'build', path.resolve('/', uri));

  // Check if file can be read
  fs.access(filename, fs.constants.R_OK, (err) => {
    // If it can't be read, update file path to index file path instead
    if (err) filename = path.join(__dirname, '..', '..', 'client', 'build', 'index.html');

    // If the path is a folder, change file path to {folder}/index.html
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, 'binary', (err, file) => {
      if (err) {
        response.writeHead(500, {
          'Content-Type': 'text/plain'
        });

        response.write(err + '\n');

        return response.end();
      }

      // Find the Content Type based on extention through the MIME module
      response.writeHead(200, {
        'Content-Type': mime['getType'](filename)
      });

      response.write(file, 'binary');

      response.end();
    });
  });
};

export default file;
