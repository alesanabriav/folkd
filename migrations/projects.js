module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable("projects", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      company_id: Sequelize.INTEGER,
      client_id: Sequelize.INTEGER,
      name: Sequelize.STRING,
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
    });
  },

  down: (queryInterface, Sequelize) => {
		queryInterface.dropTable('projects');
	}
};
