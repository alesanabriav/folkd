const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");

const GraphQLJSON = require("graphql-type-json");

const todoFilter = new GraphQLNonNull(
  new GraphQLInputObjectType({
    name: "todoFilters",
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLInt) }
    })
  })
);

const todosFilter = new GraphQLNonNull(
  new GraphQLInputObjectType({
    name: "todosFilters",
    fields: () => ({
      name: { type: GraphQLJSON },
      project_id: { type: new GraphQLNonNull(GraphQLInt) }
    })
  })
);

module.exports = {
  todoFilter,
  todosFilter
}
