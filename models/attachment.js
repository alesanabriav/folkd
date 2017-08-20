module.exports = function(sequelize, Sequelize) {
  const Attachment = sequelize.define(
    "Attachment",
    {
      url: {
        type: Sequelize.STRING
      }
    },
    {
      classMethods: {
        associate(models) {
					Attachment.belongsTo(models.Todo);
					Attachment.belongsTo(models.User);
        },
      },
      underscored: true
    }
  );

  return Attachment;
}
