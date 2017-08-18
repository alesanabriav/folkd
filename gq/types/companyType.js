import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";

import GraphQLJSON from "graphql-type-json";
import User from './userType';
import Client from './clientType';
import dataloader from 'dataloader';

const Company = new GraphQLObjectType({
  name: "company",
  description: "Represent a company",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    users: {
      args: {
        name: { type: GraphQLJSON },
        limit: { type: GraphQLInt }
      },
      type: new GraphQLList(User),
      resolve(company, args) {
        return company.getUsers({ where: args });
      }
    },
    clients: {
      type: new GraphQLList(Client),
      resolve(company, args) {
        return company.getClients();
      }
    }
  })
});

export default Company;