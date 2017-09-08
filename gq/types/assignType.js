const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const models = require("../../models");
const User = require('./userType');

const Assign = new GraphQLObjectType({
  name: "assign",
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    user_id: {
      type: GraphQLInt
    },
    todo_id: {
      type: GraphQLInt
    },
    user: {
      type: User,
      resolve(assign, args) {
        return assign.getUser(args);
      }
    }
  })
});

module.exports = Assign;
