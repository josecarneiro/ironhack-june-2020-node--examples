const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('./../models/user');
const routeAuthenticationGuard = require('./../middleware/route-authentication-guard');

const authenticationRouter = new express.Router();

authenticationRouter.get('/sign-up', (request, response, next) => {
  response.render('authentication/sign-up');
});

authenticationRouter.post('/sign-up', (request, response, next) => {
  const { name, email, password } = request.body;

  bcrypt
    .hash(password, 10)
    .then(hashAndSalt => {
      return User.create({
        name,
        email,
        passwordHashAndSalt: hashAndSalt
      });
    })
    .then(user => {
      request.session.userId = user._id;
      response.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

authenticationRouter.get('/sign-in', (request, response, next) => {
  response.render('authentication/sign-in');
});

authenticationRouter.post('/sign-in', (request, response, next) => {
  const { email, password } = request.body;

  let user;

  User.findOne({ email })
    .then(document => {
      user = document;
      if (!user) {
        return Promise.reject(new Error('No user with that email.'));
      }
      const passwordHashAndSalt = user.passwordHashAndSalt;
      return bcrypt.compare(password, passwordHashAndSalt);
    })
    .then(comparison => {
      if (comparison) {
        // User email and password are correct
        request.session.userId = user._id;
        // The following session is saved to the database when we set request.session.foo = bar
        // And the corresponding cookie is sent to the browser
        /*
        _id: "zn_ZdiaHmgj3ni6lVz0whm_F6UC_et30",
        {
          "cookie":{"originalMaxAge":1296000000,"expires":"2020-08-11T11:50:00.047Z","httpOnly":true,"path":"/"},
          "userId":"5f1ebf67294bb215949d9a88"
        }
        */
        response.redirect('/');
      } else {
        // User email and password are wrong.
        const error = new Error('Password did not match.');
        // Handle error in catch block instead of in next line
        // next(error);
        return Promise.reject(error);
      }
    })
    .catch(error => {
      // next(error);
      response.render('authentication/sign-in', { error: error });
    });
});

authenticationRouter.post('/sign-out', (request, response) => {
  request.session.destroy();
  response.redirect('/authentication/sign-in');
});

authenticationRouter.get('/profile', routeAuthenticationGuard, (request, response, next) => {
  response.render('authentication/profile');
});

module.exports = authenticationRouter;
