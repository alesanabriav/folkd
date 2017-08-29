module.exports =  function(sequelize, Sequelize) {
  const Client = sequelize.define(
    "client",
    {
      name: {
        type: Sequelize.STRING
      },
      abbreviation: {
        type: Sequelize.STRING
      }
    },
    {
      underscored: true
    }
  );

  Client.associate = (models) => {
    Client.belongsTo(models.Company);
    Client.hasMany(models.Project);
  }

  return Client;
}
