const bcrypt = require('bcrypt');

module.exports = function(sequelize, Sequelize) {
  const User = sequelize.define(
    "User",
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
      password: {
        type: Sequelize.STRING
      },
      role_name: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
        default: 'user'
      },
      "company_id": {
        type: Sequelize.INTEGER
      },
      options: {
        type: Sequelize.TEXT
      }
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          if(user.password) {
            return bcrypt.hash(user.password, 10).then(hash => user.password = hash );
          }
        }
      },
      underscored: true
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Company);
    User.hasMany(models.Todo);
  }

  User.checkPassword = (user, plainPass) => {
    return bcrypt.compare(plainPass, user.password)
      .then(function(res) {
        if(res == true) return true;
        return false;
      });
  }

  return User;
}
