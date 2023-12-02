const express = require('express');
const app = express();
const http = require('http');

const port = 8080;

app.set('port', port);

// Первая переменная окружения в консоли - интервал отправки времени
// Вторая переменная - лимит отправляемых сообщений

const delay = process.env.DELAY;
const limit = process.env.LIMIT;
console.log(`Delay: ${delay}`);
console.log(`Limit: ${limit}`);

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
