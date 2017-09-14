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
const Step = require('../types/stepType');

const createStep = {
	type: Step,
	args: {
		content: {
      type: new GraphQLNonNull(GraphQLString)
    },
    todo_id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    assign_id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    position: {
      type: GraphQLInt
    }
	},
	resolve: async function(root, args, ctx) {
    const user_id = ctx.user.id;
    args = {...args, user_id };

    try {
      let todo = await models.Todo.findOne( { where: { id: args.todo_id } } );

      if(todo.user_id == user_id || todo.assign_id == user_id) {
        todo = await todo.update({ assign_id: args.assign_id });
        const assign = await models.Assign.create({ user_id: args.assign_id, todo_id: args.todo_id });
        const step =  await models.Step.create(args);
        return step;
      }
    } catch(err) {
      return err;
    }
	}
}

module.exports = {
  createStep
}
