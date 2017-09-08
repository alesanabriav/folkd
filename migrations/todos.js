module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable("todos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      deadline_start: {
        type: Sequelize.DATEONLY
      },
      deadline_end: {
        type: Sequelize.DATEONLY
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
    });
  },

  down: (queryInterface, Sequelize) => {
		queryInterface.dropTable('todos')
	}
};
