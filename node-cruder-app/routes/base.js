const express = require('express');
const Router = express.Router;

const Post = require('./../models/post');

const baseRouter = new Router();

baseRouter.get('/', (request, response, next) => {
  Post.find()
    .then(posts => {
      response.render('home', { posts });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = baseRouter;
