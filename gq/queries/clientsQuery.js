import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import Client from "../types/clientType";
import clientsFilter from '../types/clientFilterType';
import models from "../../models";

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

export default clients;
