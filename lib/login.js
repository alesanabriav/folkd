const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { secret } = require('../config.js');

const login = (req) => {
  console.log(User);
  const token = User.findOne({where: {email: req.body.email}})
  .then((user) => {
    if(user) {
      return User.checkPassword(user, req.body.password)
      .then(isValid => {
        if(isValid) {
          const token = jwt.sign({ id: user.id, role: user.role }, secret, {
            expiresIn: 86400 //seconds
          });

          return Promise.resolve({token});
        }

        return Promise.resolve({token: null});
      });
    }

    return Promise.resolve({token: null});
  });

  return token;
}

module.exports = login;
