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
import { todoFilter } from "../types/todoFilterType";
import models from "../../models";

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

export default todo;
