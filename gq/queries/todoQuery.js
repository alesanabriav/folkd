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
const { todoFilter } = require("../types/todoFilterType");
const models = require("../../models");

const todo = {
  type: Todo,
  args: {
    where: { type: todoFilter },
    limit: { type: GraphQLInt },
    order: { type: GraphQLJSON }
  },
  resolve(_, args) {
    return models.Todo.findOne(args);
  }
};

module.exports = todo;
