module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable("notifications", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type:  Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.STRING
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
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
		queryInterface.dropTable('companies');
	}
};
