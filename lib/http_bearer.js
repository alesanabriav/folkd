const { Strategy } = require('passport-http-bearer');
const jwt = require('jsonwebtoken');
const models = require('../models');
const { secret } = require('../config');

const getUser = (id, cb) => {
  //check for is authorizate for admin in db
  return models.User.findById(id)
  .then(user => {
    if(user && user.email_verified == true) return cb(null, user);
    return cb(null, false);
  });
}

const HttpBearer = new Strategy(
  function(token, cb) {

    jwt.verify(token, secret, (err, payload) => {
      if(err) {
        const decoded = jwt.decode(token);
        if(err.message === 'jwt expired') {
          return getUser(decoded.id, cb);
        }

        return cb(null, false)
      };

      return getUser(payload.id, cb);
    });
});

module.exports = HttpBearer;
