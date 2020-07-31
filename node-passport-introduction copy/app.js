'use strict';

// 1 - Add all required middleware for sessions to our app.
// 2 - Add passport middleware our app.
// 3 - Create a file where we'll configure passport.
//   3.1 - Create a serialization and deserialization mechanism for passport.
//   3.2 - Configure authentication strategies
// 4 - Use the configured strategies in the authentication route handlers.

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');
const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');
const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const passport = require('passport');

require('./configure-passport');

const app = express();

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(
  sassMiddleware({
    src: join(__dirname, 'public'),
    dest: join(__dirname, 'public'),
    outputStyle: process.env.NODE_ENV === 'development' ? 'nested' : 'compressed',
    force: process.env.NODE_ENV === 'development',
    sourceMap: true
  })
);
app.use(express.static(join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

// 1 - Add all required middleware for sessions to our app.
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 15,
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24
    })
  })
);

// 2 - Add passport middleware our app.
app.use(passport.initialize());
app.use(passport.session());

// 1 - Add all required middleware for sessions to our app.
app.use(bindUserToViewLocals);

app.use('/', indexRouter);
app.use('/authentication', authenticationRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;
