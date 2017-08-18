import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import Project from "../types/projectType";
import projectsFilter from "../types/projectFilterType";
import models from "../../models";

const projects = {
  type: new GraphQLList(Project),
  args: {
    where: { type: projectsFilter },
    limit: { type: GraphQLInt },
    order: { type: GraphQLJSON }
  },
  resolve(r, args, ctx, info) {
    return models.Project.findAll(args);
  }
};

export default projects;
