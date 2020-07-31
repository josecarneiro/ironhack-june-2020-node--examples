'use strict';

const roleRouteGuard = roles => {
  return (req, res, next) => {
    const role = req.user.role;
    if (roles.includes(role)) {
      next();
    } else {
      next(new Error('User is not authorized'));
    }
  };
};

module.exports = roleRouteGuard;
