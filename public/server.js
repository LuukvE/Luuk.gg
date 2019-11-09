// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development Company, L.P.

/* eslint-disable import/no-unresolved */
const compression = require('compression');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
/* eslint-enable import/no-unresolved */

const PORT = process.env.PORT || 8050;

const forceSsl = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

const app = express();

app.use(forceSsl);
app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use('/', express.static(path.resolve(__dirname)));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, 'index.html')));
});

const server = http.createServer(app);
server.listen(PORT);

console.log(`Server started, listening at: http://localhost:${PORT}...`);
