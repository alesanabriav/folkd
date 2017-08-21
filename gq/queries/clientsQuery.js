const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require ("graphql");
const GraphQLJSON = require("graphql-type-json");
const Client = require("../types/clientType");
const clientsFilter = require('../types/clientFilterType');
const models = require("../../models");

const clients = {
  type: new GraphQLList(Client),
  args: {
    where: { type: clientsFilter },
    limit: { type: GraphQLInt },
    order: { type: GraphQLJSON }
  },
  resolve(_, args, ctx, info) {
    let where = {...args.where, company_id: ctx.user.company_id};
    return models.Client.findAll({...args, where });
  }
};

module.exports = clients;
