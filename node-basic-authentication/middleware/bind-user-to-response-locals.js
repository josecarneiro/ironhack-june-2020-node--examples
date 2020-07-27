const bindUserToResponseLocals = (request, response, next) => {
  // Make the user object available to every single view
  response.locals.user = request.user;
  next();
};

module.exports = bindUserToResponseLocals;
