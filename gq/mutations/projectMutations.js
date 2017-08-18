import {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import models from "../../models";
import Project from '../types/projectType';

export const createProject = {
	type: Project,
	args: {
		name: { type: new GraphQLNonNull(GraphQLString) },
    client_id: { type: new GraphQLNonNull(GraphQLInt) }
	},
	resolve(root, args) {
		return models.Project.create(args);
	}
}

export const updateProject = {
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
