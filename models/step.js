module.exports =  function(sequelize, Sequelize) {
  const Step = sequelize.define(
    "step",
    {
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
      underscored: true
    }
  );

  Step.associate = (models) => {
    Step.belongsTo(models.User);
    Step.belongsTo(models.Todo);
    Step.hasMany(models.Attachment);
  }

  return Step;
}
