const express = require('express');
const User = require('./../models/user');

const routeAuthenticationGuard = require('./../middleware/route-authentication-guard');

const profileRouter = new express.Router();

profileRouter.get('/', routeAuthenticationGuard, (request, response, next) => {
  response.render('profile/display');
});

profileRouter.get('/edit', routeAuthenticationGuard, (request, response, next) => {
  response.render('profile/edit');
});

profileRouter.post('/edit', routeAuthenticationGuard, (request, response, next) => {
  const id = request.session.userId;
  const { name, email } = request.body;

  User.findByIdAndUpdate(id, { name, email })
    .then(() => {
      response.redirect('/profile');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = profileRouter;
