import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import models from "../../models";

export const loginUser = {
	type: new GraphQLObjectType({
        name: "userLogin",
        fields: () => ({
          email: {type: GraphQLString}
        })
      }),
      args: {
        email: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(root, args) {
        return args;
      }
};

export const registerUser = {
	name: "userRegister",
  type: new GraphQLObjectType({
  	name: "userRegister",
  	fields: () => ({
      email: {type: GraphQLString}
  	})
  }),
	 args: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
    companyName: {type: new GraphQLNonNull(GraphQLString)}
  },
	resolve() {
		
	}
}