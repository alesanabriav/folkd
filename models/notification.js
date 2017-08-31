module.exports =  function(sequelize, Sequelize) {

  const Notification = sequelize.define(
    "notification",
    {
      user_id: {
        type:  Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.STRING
      },
      is_read: {
        type: Sequelize.BOOLEAN
      }
    },
    {
      underscored: true
    }
  );

  Notification.associate = (models) => {
    Notification.belongsTo(models.User);
  }

  return Notification;
}
