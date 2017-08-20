module.exports =  function(sequelize, Sequelize) {
  const Company = sequelize.define(
    "Company",
    {
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      }
    },
    {
      classMethods: {
        associate(models) {
          Company.hasMany(models.User);
          Company.hasMany(models.Client);
        },
      },
      hooks: {
        beforeCreate: (company, options) => {
          company.slug = company.name.replace(' ', '-').toLowerCase();
        }
      },
      underscored: true
    }
  );

  return Company;
}
