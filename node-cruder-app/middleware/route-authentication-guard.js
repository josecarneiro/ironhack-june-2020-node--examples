const routeAuthenticationGuard = (request, response, next) => {
  if (request.user) {
    next();
  } else {
    next(new Error('User is not authenticated'));
  }
};

module.exports = routeAuthenticationGuard;
