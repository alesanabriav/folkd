const { Strategy } = require('passport-http-bearer');
const jwt = require('jsonwebtoken');
const models = require('../models');
const { secret } = require('../config');

const HttpBearer = new Strategy(
  function(token, cb) {
    const payload = jwt.verify(token, secret);
    console.log(payload);
    models.User.findById(payload.id).then(user => {
      if(user) return cb(null, user);
      return cb(null, false);
    });
});

module.exports = HttpBearer;
