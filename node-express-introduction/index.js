// 1 - "npm init" (or "npm init -y")
// 2 - "npm install express" (or "npm i express")
const express = require('express');

const app = express();

// Serve css and other static files from directory "public"
// express.static() returns middleware that handles every request,
// and for whatever request matches a static file,
// it sends the static file
app.use(express.static('public'));

// app.get('/style.css', (request, response) => {
//   response.sendFile(__dirname + '/views/style.css');
// });

// Set route handlers for common endpoints
app.get('/jose', (request, response) => {
  response.sendFile(__dirname + '/views/jose.html');
});

app.get('/santi', (request, response) => {
  // response.send('Hola mundo');
  response.sendFile(__dirname + '/views/santi.html');
});

app.get('/aline', (request, response) => {
  // response.send('Oi mundo');
  response.sendFile(__dirname + '/views/aline.html');
});

app.get('*', (request, response) => {
  response.send('Hello World');
});

app.listen(3000);
