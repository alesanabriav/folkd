import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";
import GraphQLJSON from "graphql-type-json";

const projectFilter = new GraphQLNonNull(
  new GraphQLInputObjectType({
    name: "projectFilter",
    fields: () => ({
      name: { type: GraphQLJSON },
      client_id: { type: new GraphQLNonNull(GraphQLInt) }
    })
  })
);

export default projectFilter;
