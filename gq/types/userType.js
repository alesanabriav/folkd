const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
// const Company = require('./companyType');

const User = new GraphQLObjectType({
  name: "user",
  description: "Represent a user",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: {
      type: GraphQLString
    },
    email: { type: GraphQLString },
    role: {type: GraphQLString }
  })
});

module.exports = User;
