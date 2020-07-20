const sum = require('./sum.js');
const operations = require('./operations');

// If we require "./operations",
// node is going to look for the following files
// "./operations.js"
// "./operations.json"
// "./operations/index.js"
// "./operations/index.json"

console.log('Hello World');

console.log(true);
console.log(3);
console.log(null);
console.log(undefined);
console.log({});
console.log([]);

console.log(sum(10, 15));
console.log(operations.multiply(10, 15));
console.log(operations.divide(10, 15));

// Using external package installed from npm

const Pokedex = require('pokedex');
const pokedex = new Pokedex();

const a = pokedex.pokemon(1);

console.log(a);

// Use internal/native node.js module
const fs = require('fs');

const bar = fs.readFileSync('./lorem.txt', 'utf-8');

console.log(bar);
