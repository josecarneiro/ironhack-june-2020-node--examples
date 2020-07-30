'use strict';

const express = require('express');
const baseRouter = new express.Router();

const Restaurant = require('./../models/restaurant');

baseRouter.get('/', (req, res, next) => {
  Restaurant.find()
    .then(restaurants => {
      res.render('home', { restaurants });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = baseRouter;
