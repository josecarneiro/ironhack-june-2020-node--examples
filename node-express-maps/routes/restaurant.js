'use strict';

const { Router } = require('express');
const restaurantRouter = new Router();

const Restaurant = require('./../models/restaurant');

restaurantRouter.get('/create', (req, res, next) => {
  res.render('restaurant/create');
});

restaurantRouter.post('/create', (req, res, next) => {
  const { name, latitude, longitude } = req.body;
  Restaurant.create({
    name,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then(restaurant => {
      res.redirect(`/restaurant/${restaurant._id}`);
    })
    .catch(error => {
      next(error);
    });
});

const metersToDegrees = meters => (meters / 1000 / 40000) * 360;

restaurantRouter.get('/search', (req, res, next) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const radius = req.query.radius;

  Restaurant.find()
    .where('location')
    .within()
    .circle({ center: [longitude, latitude], radius: metersToDegrees(radius) })
    .then(restaurants => {
      res.render('restaurant/results', { restaurants });
    })
    .catch(error => {
      next(error);
    });
});

restaurantRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .then(restaurant => {
      res.render('restaurant/single', { restaurant });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = restaurantRouter;
