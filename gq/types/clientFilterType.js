import { GraphQLInputObjectType } from "graphql";
import GraphQLJSON from "graphql-type-json";

const clientFilter = new GraphQLInputObjectType({
  name: "clientFilters",
  fields: () => ({
    id: { type: GraphQLJSON },
    name: { type: GraphQLJSON }
  })
});

export default clientFilter;
