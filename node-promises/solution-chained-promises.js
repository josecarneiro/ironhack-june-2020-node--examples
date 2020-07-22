const fs = require('fs');

fs.promises
  .readFile(__dirname + '/a.txt', 'utf-8')
  .then(a => {
    console.log(a);
    return fs.promises.readFile(__dirname + '/bs.txt', 'utf-8');
  })
  // .catch(error => {
  //   console.log('There was an error in either A or B', error);
  // })
  .then(b => {
    console.log(b);
    return fs.promises.readFile(__dirname + '/c.txt', 'utf-8');
  })
  .then(c => {
    console.log(c);
    return fs.promises.readFile(__dirname + '/d.txt', 'utf-8');
  })
  .then(d => {
    console.log(d);
  })
  .catch(error => {
    console.log(error);
  });
