module.exports =  function(sequelize, Sequelize) {
  const TodoAssign = sequelize.define(
    "todo_assign",
    {
      todo_id: {
				type: Sequelize.INTEGER
			},
      assign_id: {
        type: Sequelize.INTEGER
      }
    }
  );

  TodoAssign.associate = (models) => {
    TodoAssign.belongsTo(models.Todo);
    TodoAssign.belongsTo(models.User, {as: 'Assign', foreignKey: 'assign_id' });
  }

  return TodoAssign;
}
