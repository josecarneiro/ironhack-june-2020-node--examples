const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'hbs');
app.set(path.join(__dirname, 'views'));

// Mounting middleware that is going to parse request bodies
// that are encoded with the "url-encoded" specification
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.render('home');
});

app.post('/contact', (request, response) => {
  console.log(request.body);
  // response.redirect('/');
  response.render('thank-you');
});

app.listen(3000);
