const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const models = require("../../models");
const Client = require('../types/clientType');

const createClient = {
	type: Client,
	args: {
		name: { type: new GraphQLNonNull(GraphQLString) },
    abbreviation: { type: GraphQLString },
	},
	resolve(root, args, ctx) {
    let data = {...args, company_id: ctx.user.company_id};
		return models.Client.create(data);
	}
}

const updateClient = {
  type: Client,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    data: { type: new GraphQLNonNull(GraphQLJSON) }
  },
  resolve(root, args) {
    return models.Client.update(args.data, { where: { id: args.id } })
      .then(company => models.Client.findOne({ where: args.id }));
  }
};

module.exports = {
  createClient,
  updateClient
}
