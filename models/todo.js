module.exports =  function(sequelize, Sequelize) {
  const Todo = sequelize.define(
    "todo",
    {
      title: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "It must have a title"
          }
        }
      },
			content: {
				type: Sequelize.TEXT,
         validate: {
          notEmpty: {
            msg: "It must have content"
          }
        }
			},
      deadline_start: {
        type: Sequelize.DATE
      },
      deadline_end: {
        type: Sequelize.DATE
      },
      is_completed: {
        type: Sequelize.BOOLEAN
      }
    },
    {
      underscored: true
    }
  );

  Todo.associate = (models) => {
    Todo.belongsTo(models.User);
    Todo.belongsTo(models.User, {as: 'Assign', foreignKey: 'assign_id' });
    Todo.belongsTo(models.Project);

    Todo.hasMany(models.Step);
    Todo.hasMany(models.Attachment);
  }

  return Todo;
}
