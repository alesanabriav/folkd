const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const User = require('./userType');

const Step = new GraphQLObjectType({
  name: "step",
  fields: () => ({
    id: { type: GraphQLInt },
    content: { type: GraphQLString },
    created_at: { type: GraphQLString },
    author: {
      type: User,
      resolve(todo) {
        return todo.getUser();
      }
    }
  })
});

module.exports = Step;
