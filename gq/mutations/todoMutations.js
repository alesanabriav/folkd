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
    project_id: { type: new GraphQLNonNull(GraphQLInt) },
    assign_id: { type: GraphQLInt },
    todo_id: { type: GraphQLInt }
	},
	resolve(root, args, ctx) {
    args = {...args, user_id: ctx.user.id}
		return models.Todo.create(args);
	}
}

const updateTodo = {
  type: Todo,
  args: {
    title: { type: GraphQLString },
		content: { type: new GraphQLNonNull(GraphQLString) },
    project_id: { type: new GraphQLNonNull(GraphQLInt) },
    assign_id: { type: GraphQLInt },
    todo_id: { type: GraphQLInt },
    is_completed: { type: GraphQLBoolean }
  },
  resolve(root, args) {
    return models.Todo.update(args.data, { where: { id: args.id } })
      .then(company => models.Todo.findOne({ where: args.id }));
  }
};

module.exports = {
  createTodo,
  updateTodo
}
