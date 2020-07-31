'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

const roleRouteGuard = require('./../middleware/role-route-guard');

router.get('/purchases', routeGuard, roleRouteGuard(['customer', 'admin']), (req, res, next) => {
  res.render('purchases');
});

router.get('/sold', routeGuard, roleRouteGuard(['seller', 'admin']), (req, res, next) => {
  res.render('sold');
});

module.exports = router;
