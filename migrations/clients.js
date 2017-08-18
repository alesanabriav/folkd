module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable("clients", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      company_id: Sequelize.INTEGER,
      name: Sequelize.STRING,
			abbreviation: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
		queryInterface.dropTable('clients');
	}
};
