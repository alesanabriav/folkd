const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");

const GraphQLJSON = require("graphql-type-json");
const User = require('./userType');
const Client = require('./clientType');

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
        return company.getClients(args);
      }
    }
  })
});


module.exports = Company;
