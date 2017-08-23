const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");

const GraphQLJSON = require("graphql-type-json");
const models = require("../../models");

const loginUser = {
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

const registerUser = {
	name: "userRegister",
  type: new GraphQLObjectType({
  	name: "userRegister",
  	fields: () => ({
      email: {type: GraphQLString}
  	})
  }),
	 args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    companyName: { type: new GraphQLNonNull(GraphQLString) }
  },
	resolve() {

	}
}

module.exports = {
  loginUser,
  registerUser
}
