module.exports = function(sequelize, Sequelize) {
  const Attachment = sequelize.define(
    "Attachment",
    {
      user_id: {
        type: Sequelize.INTEGER
      },
      todo_id: {
        type: Sequelize.INTEGER
      },
      step_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      }
    },
    {
      underscored: true
    }
  );

  Attachment.associate = (models) => {
    Attachment.belongsTo(models.User);
    Attachment.belongsTo(models.Todo);
    Attachment.belongsTo(models.Step);
  }

  return Attachment;
}
