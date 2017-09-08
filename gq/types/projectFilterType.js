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
        type: GraphQLInt
      },
      company_id: {
        type: GraphQLInt
      },
    })
  })


module.exports = projectFilter;
