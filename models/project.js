module.exports =  function(sequelize, Sequelize) {
  const Project = sequelize.define(
    "Project",
    {
      name: {
        type: Sequelize.STRING
      }
    },
    {
      classMethods: {
        associate(models) {
          Project.hasMany(models.Todo);
					Project.belongsTo(models.Client);
        },
      },
      underscored: true
    }
  );

  return Project;
}
