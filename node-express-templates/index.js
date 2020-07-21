const express = require('express');
const hbs = require('hbs');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');

app.locals.title = 'Default title...';

app.get('/jose', (request, response) => {
  response.render('person', { title: 'Zé', message: 'Olá Mundo' });
});

app.get('/santi', (request, response) => {
  response.render('person', { title: 'Santi', message: 'Hola Mundo' });
});

app.get('/aline', (request, response) => {
  response.render('person', { title: 'Aline', message: 'Oi Mundo' });
});

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

app.get('*', (request, response) => {
  response.send('Hello World');
});

app.listen(3000);
