const express = require('express');
const app = express();
const http = require('http');

const port = 8080;

app.set('port', port);

const argv = process.argv.slice(2);

const delay = argv[0];
const limit = argv[1];

let connections = [];

const server = http.createServer(app);

app.get('/', (req, res, next) => {
  connections.push(res);
});

let tick = 0;
setTimeout(function run () {
  if (++tick > limit) {
    connections.map((res) => {
      res.write('END\n');
      res.end();
    });
    connections = [];
    tick = 0;
  }
  connections.map((res, i) => {
    res.write(`${i} Tick: ${tick}.\n`);
  });
  setTimeout(run, delay);
}, delay);

server.listen(port);
