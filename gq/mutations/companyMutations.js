import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import models from "../../models";
import Company from '../types/companyType';

export const createCompany = {
	type: Company,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    abbreviation: { type: GraphQLString }
    },
  resolve(root, args) {
    return models.Company.create(args);
  }
};

export const updateCompany = {
  type: Company,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    data: { type: new GraphQLNonNull(GraphQLJSON) }
  },
  resolve(root, args) {
    return models.Company.update(args.data, { where: { id: args.id } })
        .then(company => models.Company.findOne({where: args.id}));
  }
};
