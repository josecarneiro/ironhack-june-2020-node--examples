const path = require('path');

const express = require('express');
const hbs = require('hbs');
const axios = require('axios');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('home');
});

app.get('/search', (request, response) => {
  const term = request.query.term;
  const url = `http://www.omdbapi.com/?apikey=6ec73a05&s=${term}`;

  axios
    .get(url)
    .then(result => {
      const data = result.data;
      const searchResults = data.Search;

      response.render('search', { results: searchResults });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/movie/:id', (request, response) => {
  const id = request.params.id;
  const url = `http://www.omdbapi.com/?apikey=6ec73a05&i=${id}`;

  axios
    .get(url)
    .then(result => {
      const data = result.data;
      const movie = data;
      response.render('movie', { movie });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3020);
