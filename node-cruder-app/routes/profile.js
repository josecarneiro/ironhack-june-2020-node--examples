const express = require('express');
const User = require('./../models/user');
const Post = require('./../models/post');

const routeAuthenticationGuard = require('./../middleware/route-authentication-guard');

const profileRouter = new express.Router();

profileRouter.get('/:id', routeAuthenticationGuard, (request, response, next) => {
  const id = request.params.id;

  let user;

  User.findById(id)
    .then(document => {
      user = document;
      return Post.find({ creator: id }).populate('creator');
    })
    .then(posts => {
      response.render('profile/display', { profile: user, posts });
    })
    .catch(error => {
      next(error);
    });
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
