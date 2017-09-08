const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
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
    role: { type: GraphQLString },
    has_drive: {
      type: GraphQLBoolean,
      resolve(todo) {
        return todo.ga_access_token && todo.ga_refresh_token ? true : false
      }
    }
  })
});

module.exports = User;
