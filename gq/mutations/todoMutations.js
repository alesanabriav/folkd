const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const models = require("../../models");
const Todo = require('../types/todoType');

const createTodo = {
	type: Todo,
	args: {
		title: { type: GraphQLString },
		content: { type: new GraphQLNonNull(GraphQLString) },
    deadline_start: { type: GraphQLString  },
    deadline_end: { type: GraphQLString  },
    project_id: { type: new GraphQLNonNull(GraphQLInt) },
    assign_id: { type: GraphQLInt },
    todo_id: { type: GraphQLInt }
	},
	resolve(root, args, ctx) {
    args = {...args, user_id: ctx.user.id};

		return models.Todo.create(args);
	}
}

const updateTodo = {
  type: Todo,
  args: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
		content: { type: new GraphQLNonNull(GraphQLString) },
    deadline_start: { type: GraphQLString  },
    deadline_end: { type: GraphQLString  },
    assign_id: { type: GraphQLInt },
    todo_id: { type: GraphQLInt },
    is_completed: { type: GraphQLBoolean }
  },
  resolve(root, args) {

    return models.Todo.findOne({ where: args.id })
    .then(todo => {

      if(todo.is_completed == false || todo.is_completed == 0) {
        return models.Todo.update(args, { where: { id: args.id } })
          .then(() => {
            return models.Todo.findOne({ where: args.id });
          });
      } else {
        return todo;
      }

    })
  }
};

module.exports = {
  createTodo,
  updateTodo
}
