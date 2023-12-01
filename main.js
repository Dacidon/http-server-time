const express = require('express');
const app = express();
const http = require('http');

const port = 8080;

app.set('port', port);

const argv = process.argv.slice(2);

// Первый аргумент в консоли - интервал отправки времени
// Второй аргумент - лимит отправляемых сообщений

const delay = argv[0];
const limit = argv[1];

let connections = [];

const server = http.createServer(app);

app.get('/', (req, res) => {
  connections.push(res);
});

let tick = 0;
setTimeout(function run () {
  if (++tick > limit) {
    connections.map((res) => {
      res.write('END\n');
      return res.end();
    });
    connections = [];
    tick = 0;
  }
  connections.map((res, i) => {
    return res.write(`${new Date()}\n`);
  });
  setTimeout(run, delay);
}, delay);

server.listen(port);
