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
	resolve(root, args, ctx) {
    const user_id = ctx.user.id;
    args = {...args, user_id };
    return models.Todo.findOne( { where: { id: args.todo_id } } )
      .then( todo => {
        //check the last step assigend person to allow that person to crete a new step
        return models.Step.create(args);
      });
	}
}

module.exports = {
  createStep
}
