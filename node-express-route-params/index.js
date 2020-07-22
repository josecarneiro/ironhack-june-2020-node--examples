const express = require('express');
const hbs = require('hbs');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');

app.get('/about', (request, response) => {
  response.render('about', {
    name: 'José',
    age: 27,
    location: { city: 'Elvas', country: 'Portugal' },
    pets: [
      { name: 'Whiskers', isWellBehaved: false, species: 'cat' },
      { name: 'Panda', isWellBehaved: true, species: 'dog' },
      { name: 'Leão', isWellBehaved: false, species: 'dog' },
      { name: 'Chico', isWellBehaved: true, species: 'parakeet' }
    ]
  });
});

app.get('/:bar', (request, response) => {
  const name = request.params.bar;

  switch (name) {
    case 'jose':
      response.render('person', { message: 'Olá mundo' });
      break;
    case 'santi':
      response.render('person', { message: 'Hola mundo' });
      break;
    case 'aline':
      response.render('person', { message: 'Oi mundo' });
      break;
    default:
      response.render('person');
  }
});

app.get('*', (request, response) => {
  response.send('Hello World');
});

app.listen(3000);
