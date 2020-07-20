const http = require('http');

const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;

  console.log(url);
  console.log(method);

  switch (url) {
    case '/jose':
      response.write('Olá mundo');
      break;
    case '/santi':
      response.write('Hola mundo');
      break;
    case '/aline':
      response.write('Oi mundo');
      break;
    default:
      response.write('Hello World');
  }

  response.end();
});

// We usually use ports 3000-3999, 5000-5999, 8000-8999 for development

server.listen(3000);
