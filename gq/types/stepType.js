import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import User from './userType';

const Step = new GraphQLObjectType({
  name: "step",
  fields: () => ({
    id: { type: GraphQLInt },
    content: { type: GraphQLString },
    created_at: { type: GraphQLString },
    author: {
      type: User,
      resolve(todo) {
        return todo.getUser();
      }
    }
  })
});

export default Step;