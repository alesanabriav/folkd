module.exports =  function(sequelize, Sequelize) {
  const Project = sequelize.define(
    "Project",
    {
      name: {
        type: Sequelize.STRING
      }
    },
    {
      underscored: true
    }
  );

  Project.associate = (models) => {
    Project.hasMany(models.Todo);
    Project.belongsTo(models.Client);
  };

  return Project;
}
