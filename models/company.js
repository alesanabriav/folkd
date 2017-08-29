module.exports =  function(sequelize, Sequelize) {
  const Company = sequelize.define(
    "Company",
    {
      team_name: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      sector: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      options: {
        type: Sequelize.TEXT
      }
    },
    {
      hooks: {
        beforeCreate: (company, options) => {
          company.team_name = company.team_name.toLowerCase();
          company.slug = company.team_name.replace(' ', '-').toLowerCase();
        }
      },
      underscored: true
    }
  );

  Company.associate = (models) => {
    Company.hasMany(models.User);
    Company.hasMany(models.Client);
  }

  return Company;
}
