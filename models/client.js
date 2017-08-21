module.exports =  function(sequelize, Sequelize) {
  const Client = sequelize.define(
    "Client",
    {
      name: {
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
