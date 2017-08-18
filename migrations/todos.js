module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable("todos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      user_id: Sequelize.INTEGER,
      assign_id: Sequelize.INTEGER,
      project_id: Sequelize.INTEGER,
      title: Sequelize.STRING,
      content: Sequelize.TEXT,
      is_completed: {
        type: Sequelize.BOOLEAN, 
        defaultValue: 0 
      }
    });
  },

  down: (queryInterface, Sequelize) => {
		queryInterface.dropTable('todos')
	}
};
