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
	resolve: async (root, args, ctx) => {
    try {
      const todo = await models.Todo.create({...args, user_id: ctx.user.id});
      const assign = await models.Assign.create({user_id: args.assign_id, todo_id: todo.id});
  		return todo;
    } catch(err) {
      return err.message;
    }
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
  resolve(_, args, ctx) {

    return models.Todo.findOne({ where: args.id })
    .then(todo => {
      if(todo.is_completed == 0 && (todo.user_id == ctx.user.id ||  todo.assign_id == ctx.user.id)) {
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
