module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable("attachments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER
      },
			todo_id: {
        type: Sequelize.INTEGER
      },
			step_id: {
        type: Sequelize.INTEGER
      },
      'drive_id': {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
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
		queryInterface.dropTable('attachments')
	}
};
