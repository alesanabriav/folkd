const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} =  require("graphql");
const GraphQLJSON =  require("graphql-type-json");
const Project =  require("../types/projectType");
const projectsFilter =  require("../types/projectFilterType");
const models =  require("../../models");

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

module.exports = projects;
