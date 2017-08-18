module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable("steps", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: Sequelize.INTEGER,
      todo_id: Sequelize.INTEGER,
      content: Sequelize.TEXT,
			position: Sequelize.INTEGER,
			created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
		queryInterface.dropTable('steps')
	}
};
