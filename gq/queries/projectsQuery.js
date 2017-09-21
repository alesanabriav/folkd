const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType
} =  require("graphql");
const GraphQLJSON =  require("graphql-type-json");
const Project =  require("../types/projectType");
const projectsFilter =  require("../types/projectFilterType");
const models =  require("../../models");

const projects = {
  type: new GraphQLList(Project),
  args: {
    where: {
      type: projectsFilter
    },
    limit: {
      type: GraphQLInt
    },
    order: {
      type: GraphQLJSON
    }
  },
  resolve(_, args, ctx) {
    const query = {...args, where: {...args.where, company_id: ctx.user.company_id} };
    return models.Project.findAll(query);
  }
};

module.exports = projects;
