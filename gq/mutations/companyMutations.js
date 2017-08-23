const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const models = require("../../models");
const Company = require('../types/companyType');

const createCompany = {
	type: Company,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    abbreviation: { type: GraphQLString }
    },
  resolve(root, args) {
    return models.Company.create(args);
  }
};

const updateCompany = {
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

module.exports = {
  createCompany,
  updateCompany
}
