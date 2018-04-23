const http = require('http');

http.createServer((req, res) => {
  const filename = `.${req.url}`;
  if (filename === './stream') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.write('retry:1000-\n');
    res.write('event:connecttime\n');
    res.write(`data:${new Date()}\n\n`);
    const interval = setInterval(() => {
      res.write(`data:${new Date()}\n\n`);
    }, 1000);
    req.connection.addListener('close', () => {
      clearInterval(interval);
    }, false);
  }
}).listen(80, '127.0.0.1');
