module.exports =  function(sequelize, Sequelize) {
  const Client = sequelize.define(
    "Client",
    {
      name: {
        type: Sequelize.STRING
      }
    },
    {
      classMethods: {
        associate(models) {
					Client.belongsTo(models.Company);
					Client.hasMany(models.Project);
        },
      },
      underscored: true
    }
  );

  return Client;
}
