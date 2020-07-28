const express = require('express');
const Post = require('./../models/post');

const routeAuthenticationGuard = require('./../middleware/route-authentication-guard');

const postRouter = new express.Router();

postRouter.get('/create', routeAuthenticationGuard, (request, response) => {
  response.render('post/create');
});

postRouter.post('/create', routeAuthenticationGuard, (request, response, next) => {
  const { content } = request.body;

  Post.create({
    content,
    creator: request.session.userId
  })
    .then(post => {
      response.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

postRouter.get('/:id', (request, response, next) => {
  const id = request.params.id;

  Post.findById(id)
    .then(post => {
      if (post) {
        response.render('post/single', { post: post });
      } else {
        next();
      }
    })
    .catch(error => {
      next(error);
    });
});

postRouter.post('/:id/delete', routeAuthenticationGuard, (request, response, next) => {
  const id = request.params.id;
  const userId = request.session.userId;

  Post.findOneAndDelete({ _id: id, creator: userId })
    .then(() => {
      response.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

postRouter.get('/:id/edit', routeAuthenticationGuard, (request, response, next) => {
  const id = request.params.id;
  const userId = request.session.userId;

  Post.findOne({ _id: id, creator: userId })
    .then(post => {
      if (post) {
        response.render('post/edit', { post });
      } else {
        next();
      }
    })
    .catch(error => {
      next(error);
    });
});

postRouter.post('/:id/edit', routeAuthenticationGuard, (request, response, next) => {
  const id = request.params.id;
  const { content } = request.body;
  const userId = request.session.userId;

  Post.findOneAndUpdate({ _id: id, creator: userId }, { content })
    .then(() => {
      response.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = postRouter;
