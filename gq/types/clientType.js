const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");

const models = require("../../models");

const Client = new GraphQLObjectType({
  name: "client",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    abbreviation: { type: GraphQLString }
  })
});

module.exports = Client;
