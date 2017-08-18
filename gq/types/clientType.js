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
import clientsFilter from '../types/clientFilterType';
import models from "../../models";

const Client = new GraphQLObjectType({
  name: "client",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    abbreviation: { type: GraphQLString },
    projects: {
      type: new GraphQLList(Project),
      args: {
        where: { type: clientsFilter },
        limit: { type: GraphQLInt }
      },
      resolve(client, args) {
        console.log(`---------client: projects call-----------`);
        return client.getProjects(args);
      }
    }
  })
});

export default Client;
