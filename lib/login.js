const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { secret } = require('../config.js');

const getToken = (user) => {
  const token = jwt.sign({ id: user.id, role: user.role }, secret, {
    expiresIn: '1h'
  });

  return token;
}

const login = (req) => {
  const token = User.findOne({ where: { email: req.body.email, email_verified: true } })
  .then((user) => {
    if(user) {
      return User.checkPassword(user, req.body.password)
      .then(isValid => {
        if(isValid) {
          const token = getToken(user);

          return Promise.resolve({token});
        }

        return Promise.resolve({token: null});
      });
    }

    return Promise.resolve({token: null});
  });

  return token;
}

module.exports = {
  getToken,
  login
};
