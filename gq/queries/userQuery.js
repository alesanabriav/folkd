const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const User = require("../types/userType");

const user = {
  type: User,
  resolve(root, args, ctx) {
    return ctx.user;
  }
};

module.exports = user;
