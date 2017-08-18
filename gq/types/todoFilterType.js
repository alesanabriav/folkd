import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";

import GraphQLJSON from "graphql-type-json";

export const todoFilter = new GraphQLNonNull(
  new GraphQLInputObjectType({
    name: "todoFilters",
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLInt) }
    })
  })
);

export const todosFilter = new GraphQLNonNull(
  new GraphQLInputObjectType({
    name: "todosFilters",
    fields: () => ({
      name: { type: GraphQLJSON },
      project_id: { type: new GraphQLNonNull(GraphQLInt) }
    })
  })
);

