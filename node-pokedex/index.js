const express = require('express');
const Pokedex = require('pokedex');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const pokedex = new Pokedex();

app.get('/', (request, response) => {
  const list = [];
  for (let i = 1; i <= 151; i++) {
    const pokemon = pokedex.pokemon(i);
    list.push(pokemon);
  }
  response.render('list', { list: list });
});

app.get('/pokemon/:name', (request, response) => {
  const name = request.params.name;
  const pokemon = pokedex.pokemon(name);
  response.render('single', { pokemon: pokemon });
});

app.listen(3010);
