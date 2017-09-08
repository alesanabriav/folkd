const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const models = require("../../models");
const Project = require('../types/projectType');

const createProject = {
	type: Project,
	args: {
		name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    client_id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
	},
	resolve(root, args) {
    let data = {...args, company_id: ctx.user.company_id};
		return models.Project.create(data);
	}
}

const updateProject = {
  type: Project,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    data: { type: new GraphQLNonNull(GraphQLJSON) }
  },
  resolve(root, args) {
    return models.Project.update(args.data, { where: { id: args.id } })
        .then(project => models.Project.findOne({ where: args.id }));
  }
};

module.exports = {
  createProject,
  updateProject
}
