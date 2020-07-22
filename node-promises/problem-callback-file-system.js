const fs = require('fs');

// const a = fs.readFileSync(__dirname + '/a.txt', 'utf-8');

// console.log(a);

// const b = fs.readFileSync(__dirname + '/b.txt', 'utf-8');

// console.log(b);

fs.readFile(__dirname + '/a.txt', 'utf-8', (error, a) => {
  console.log(a);
  fs.readFile(__dirname + '/b.txt', 'utf-8', (error, b) => {
    console.log(b);
    fs.readFile(__dirname + '/c.txt', 'utf-8', (error, c) => {
      console.log(c);
      fs.readFile(__dirname + '/d.txt', 'utf-8', (error, d) => {
        console.log(d);
      });
    });
  });
});
