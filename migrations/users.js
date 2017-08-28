module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable("users", {
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
      company_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'member'
      },
      options: {
        type: Sequelize.TEXT
      },
      authorized: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    });
  },

  down: (queryInterface, Sequelize) => {
		queryInterface.dropTable('users')
	}
};
