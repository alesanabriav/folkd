module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable("companies", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
      slug: Sequelize.STRING,
      logo: Sequelize.STRING,
      address: Sequelize.STRING,
      phone: Sequelize.STRING,
      country: Sequelize.STRING,
      city: Sequelize.STRING,
      options: Sequelize.TEXT,
      sector: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
		queryInterface.dropTable('companies');
	}
};
