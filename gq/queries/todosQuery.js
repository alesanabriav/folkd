const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");

const GraphQLJSON = require("graphql-type-json");
const Todo = require("../types/todoType");
const { todosFilter } = require("../types/todoFilterType");
const models = require("../../models");

const todos = {
  type: new GraphQLList(Todo),
  args: {
    where: {type: todosFilter},
    limit: { type: GraphQLInt },
    order: { type: GraphQLJSON }
  },
  resolve(_, args) {
    return models.Todo.findAll(args);
  }
};

module.exports = todos;
