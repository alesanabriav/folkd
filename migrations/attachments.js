module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable("attachments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
       created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      user_id: Sequelize.INTEGER,
			todo_id: Sequelize.INTEGER,
			step_id: Sequelize.INTEGER,
			url: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => {
		queryInterface.dropTable('attachments')
	}
};
