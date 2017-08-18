import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";

import GraphQLJSON from "graphql-type-json";
import Todo from "../types/todoType";
import { todosFilter } from "../types/todoFilterType";
import models from "../../models";

const todos = {
  type: new GraphQLList(Todo),
  args: {
    where: {type: todosFilter},
    limit: { type: GraphQLInt },
    order: { type: GraphQLJSON }
  },
  resolve(_, args) {
    console.log(`---------todos query-----------`);
    return models.Todo.findAll(args);
  }
};

export default todos;
