'use strict';

const passport = require('passport');
const passportLocal = require('passport-local');

const bcryptjs = require('bcryptjs');
const User = require('./models/user');

// 3 - Create a file where we'll configure passport.
//   3.1 - Configure authentication strategies
//   3.2 - Create a serialization and deserialization mechanism for passport.

//   3.1 - Configure authentication strategies

passport.use(
  'sign-up',
  new passportLocal.Strategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    (req, email, password, callback) => {
      const name = req.body.name;
      const role = req.body.role;

      bcryptjs
        .hash(password, 10)
        .then(hash => {
          return User.create({
            name,
            email,
            role,
            passwordHash: hash
          });
        })
        .then(user => {
          callback(null, user);
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);

passport.use(
  'sign-in',
  new passportLocal.Strategy(
    {
      usernameField: 'email'
    },
    (email, password, callback) => {
      let user;
      User.findOne({ email })
        .then(document => {
          if (!document) {
            return Promise.reject(new Error("There's no user with that email."));
          } else {
            user = document;
            return bcryptjs.compare(password, user.passwordHash);
          }
        })
        .then(result => {
          if (result) {
            callback(null, user);
          } else {
            return Promise.reject(new Error('Wrong password.'));
          }
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);

//   3.2 - Create a serialization and deserialization mechanism for passport.

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});
