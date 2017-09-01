const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const Project = require("./projectType");
const clientsFilter = require('../types/clientFilterType');
const models = require("../../models");

const Client = new GraphQLObjectType({
  name: "client",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    abbreviation: { type: GraphQLString },
    projects: {
      type: new GraphQLList(Project),
      args: {
        where: { type: clientsFilter },
        limit: { type: GraphQLInt }
      },
      resolve(client, args) {
        console.log(`---------client: projects call-----------`);
        return client.findOne({include: [{
            model: models.Project,
            ...args
          }]
        });
      }
    }
  })
});

module.exports = Client;
