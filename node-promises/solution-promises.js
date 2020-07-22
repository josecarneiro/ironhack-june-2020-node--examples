const fs = require('fs');

const aPromise = fs.promises.readFile(__dirname + '/a.txt', 'utf-8');

aPromise
  .then(a => {
    console.log(a);
  })
  .catch(error => {
    console.log(error);
  });

const bPromise = fs.promises.readFile(__dirname + '/b.txt', 'utf-8');

bPromise
  .then(b => {
    console.log(b);
  })
  .catch(error => {
    console.log(error);
  });
