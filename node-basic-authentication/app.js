const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');

const mongoStore = connectMongo(expressSession);

const deserializeUser = require('./middleware/deserialize-user');
const bindUserToResponseLocals = require('./middleware/bind-user-to-response-locals');

const authenticationRouter = require('./routers/authentication');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Make request body available in request.body
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    secret: 'ABC',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000
    },
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60
    })
  })
);

app.use(deserializeUser);
app.use(bindUserToResponseLocals);

app.get('/', (request, response, next) => {
  response.render('home');
});

app.use('/authentication', authenticationRouter);

app.use('/', (request, response, next) => {
  next(new Error('Page not found'));
});

app.use((error, request, response, next) => {
  response.render('error', { error });
});

module.exports = app;
