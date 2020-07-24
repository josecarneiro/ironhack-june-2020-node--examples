const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const nodeSassMiddleware = require('node-sass-middleware');

const baseRouter = require('./routes/base');
const postRouter = require('./routes/post');

const app = express();

// Set options for app

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Mount necessary middleware

app.use(
  nodeSassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    outputStyle: 'nested',
    force: true,
    sourceMap: false
  })
);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Route Handlers

app.use(baseRouter);
app.use('/post', postRouter);

// If no route handler is matched above,
// this will run
app.use('*', (request, response, next) => {
  const error = new Error('Page not found.');
  next(error);
});

// If next(error) was called previously,
// this will run
app.use((error, request, response, next) => {
  console.log(error);
  response.render('error', { error });
});

// Connect to mongodb and only then start the app
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(error => {
    console.log(error);
  });
