module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('todo_assign', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      todo_id: {
        type: Sequelize.INTEGER
      },
      assign_id: {
        type: Sequelize.INTEGER
      },
			created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
		queryInterface.dropTable('todo_assign')
	}
};
