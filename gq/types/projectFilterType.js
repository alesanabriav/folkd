const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");

const projectFilter = new GraphQLInputObjectType({
    name: "projectFilter",
    fields: () => ({
      name: { type: GraphQLJSON },
      client_id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    })
  })


module.exports = projectFilter;
