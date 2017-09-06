module.exports =  function(sequelize, Sequelize) {
  const Step = sequelize.define(
    "step",
    {
      assign_id: {
        type: Sequelize.INTEGER
      },
			content: {
				type: Sequelize.TEXT,
         validate: {
          notEmpty: {
            msg: "It must have content"
          }
        }
			},
      position: {
        type: Sequelize.INTEGER
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
      underscored: true
    }
  );

  Step.associate = (models) => {
    Step.belongsTo(models.User);
    Step.belongsTo(models.User, {as: 'Assign', foreignKey: 'assign_id' });
    Step.belongsTo(models.Todo);
    Step.hasMany(models.Attachment);
  }

  return Step;
}
