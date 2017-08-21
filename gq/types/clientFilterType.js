const { GraphQLInputObjectType } = require("graphql");
const GraphQLJSON = require("graphql-type-json");

const clientFilter = new GraphQLInputObjectType({
  name: "clientFilters",
  fields: () => ({
    id: { type: GraphQLJSON },
    name: { type: GraphQLJSON }
  })
});

module.exports = clientFilter;
