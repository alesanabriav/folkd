const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const models = require("../../models");

const Attachment = new GraphQLObjectType({
  name: "attachment",
  fields: () => ({
    id: { type: GraphQLInt },
    url: { type: GraphQLString }
  })
});

module.exports = Attachment;
