import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import Project from "./projectType";
import models from "../../models";

const projectsFilter = new GraphQLInputObjectType({
  name: "projectsFilter",
  fields: () => ({
    name: { type: GraphQLJSON }
  })
});

const Client = new GraphQLObjectType({
  name: "client",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    abbreviation: { type: GraphQLString },
    projects: {
      type: new GraphQLList(Project),
      args: {
        where: { type: projectsFilter },
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt }
      },
      resolve(client, args) {
        return client.getProjects(args);
      }
    }
  })
});

export default Client;
