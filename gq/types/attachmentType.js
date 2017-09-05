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
    id: {
      type: GraphQLInt
    },
    user_id: {
      type: GraphQLInt
    },
    todo_id: {
      type: GraphQLInt
    },
    step_id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    }
  })
});

module.exports = Attachment;
