const express = require('express');
const Post = require('./../models/post');

const postRouter = new express.Router();

postRouter.get('/create', (request, response) => {
  response.render('post/create');
});

postRouter.post('/create', (request, response, next) => {
  const data = request.body;

  Post.create({
    content: data.content
  })
    .then(post => {
      console.log('Post creation was successful.', post);
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
      response.render('post/single', { post: post });
    })
    .catch(error => {
      next(error);
    });
});

postRouter.post('/:id/delete', (request, response, next) => {
  const id = request.params.id;

  Post.findByIdAndDelete(id)
    .then(() => {
      response.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

postRouter.get('/:id/edit', (request, response, next) => {
  const id = request.params.id;

  Post.findById(id)
    .then(post => {
      response.render('post/edit', { post });
    })
    .catch(error => {
      next(error);
    });
});

postRouter.post('/:id/edit', (request, response, next) => {
  const id = request.params.id;
  const data = request.body;

  Post.findByIdAndUpdate(id, { content: data.content })
    .then(() => {
      response.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = postRouter;
