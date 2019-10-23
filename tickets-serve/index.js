// 搭建 mock-serve 服务器

const express = require('express');

const app = express();

app.get('/', (Request, Response) => {
  Response.status(200);
  Response.send('hello express');
  Response.end();
});

app.get('/rest', (Request, Response) => {
  Response.json({
    result: true,
    message: 'hello express',
  })
});


app.listen(8090);