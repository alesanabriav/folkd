module.exports =  function(sequelize, Sequelize) {
  const Step = sequelize.define(
    "Step",
    {
			content: {
				type: Sequelize.TEXT,
         validate: {
          notEmpty: {
            msg: "It must have content"
          }
        }
			}
    },
    {
      validate: {
        isAssigned(models, e) {
          if (this.client_id === null) {
            throw new Error('Not permit')
          }
        }
      },
      classMethods: {
        associate(models) {
					Step.belongsTo(models.User);
          Step.belongsTo(models.Todo);
        },

      },
      underscored: true
    }
  );

  return Step;
}
