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
      }
    },
    {
      classMethods: {
        associate(models) {
          User.belongsTo(models.Company);
          User.hasMany(models.Todo);
        },
				checkPassword(user, plainPass) {
					return bcrypt.compare(plainPass, user.password).then(function(res) {
							if(res == true) return true;
							return false;
					});
				}
      },
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

  return User;
}
