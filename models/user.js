const bcrypt = require('bcrypt');

module.exports = function(sequelize, Sequelize) {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: {
            msg: 'it must be an email'
          },
          isUnique(email, next) {
            return User.findOne({where: { email: email }, attributes: ['id']})
              .then(user => {
                if(user) return next('email already in use');
                next();
            });
          }
        }
      },
      domain: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      //member / admin / owner
      role: {
        type: Sequelize.STRING
      },
      authorized: {
        type: Sequelize.BOOLEAN
      },
      email_verified: {
        type: Sequelize.BOOLEAN
      },
      company_id: {
        type: Sequelize.INTEGER
      },
      options: {
        type: Sequelize.TEXT
      },
      verify_token: {
        type: Sequelize.STRING
      },
      ga_access_token: {
        type: Sequelize.STRING,
      },
      ga_refresh_token: {
        type: Sequelize.STRING
      }
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          if(user.email && user.password) {
            let token = `${user.email}-${Date.now()}`;

            return bcrypt.hash(token, 10)
              .then(hash => user.verify_token = hash )
              .then(() => {
                return bcrypt.hash(user.password, 10);
              })
              .then(hash => {
                user.password = hash;
                user.domain = user.email ? user.email.split('@')[1] : '';
                return user;
              });
          }
        }
      },
      underscored: true
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Company);
    User.hasMany(models.Todo);
    User.hasMany(models.Step);
  }

  User.checkPassword = (user, plainPass) => {
    return bcrypt.compare(plainPass, user.password)
      .then(function(res) {
        if(res == true) return true;
        return false;
      });
  }

  User.generateVerifyToken = (user) => {
    let token = `${user.email}-${Date.now()}`;

    return bcrypt.hash(token, 10)
      .then(hash => {
        return user.update({ verify_token: hash })
          .then(user => user);
      });

    ;
  };

  User.emailVerified = (user) => {
    return user.update({ email_verified: true })
    .then(user => user);
  }

  return User;
}
