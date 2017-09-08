module.exports = function(sequelize, Sequelize) {
  const Assign = sequelize.define(
    "assign",
    {
      user_id: {
        type: Sequelize.INTEGER
      },
      todo_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE
      }
    },
    {
      underscored: true
    }
  );

  Assign.associate = (models) => {
    Assign.belongsTo(models.Todo);
    Assign.belongsTo(models.User);
  }

  return Assign;
}
