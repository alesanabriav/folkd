import {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import models from "../../models";
import Step from '../types/stepType';

export const createStep = {
	type: Step,
	args: {
		content: { type: new GraphQLNonNull(GraphQLString) },
    todo_id: { type: new GraphQLNonNull(GraphQLInt) }
	},
	resolve(root, args, ctx) {
    const user_id = ctx.user.id;
    args = {...args, user_id };
    return models.Todo.findOne( { where: { id: args.todo_id } } ).then( todo => {
      if(todo.assign_id == user_id) return models.Step.create(args);
      return Promise.reject('no permitted');
    });
	}
}
