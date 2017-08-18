import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import User from './userType';
import Step from './stepType';

const Todo = new GraphQLObjectType({
  name: "todo",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    created_at: { type: GraphQLString },
    is_completed: { type: GraphQLBoolean },
    steps: {
      type: new GraphQLList(Step),
      args: {
        where: { type: GraphQLJSON },
        order: { type: GraphQLJSON },
        limit: { type: GraphQLInt }
      },
      resolve(todo, args) {
        console.log(`---------todo: steps call-----------`);
        return todo.getSteps(args);
      }
    },
    author: {
      type: User,
      resolve(todo) {
         console.log(`---------todo: user call-----------`);
        return todo.getUser();
      }
    },
    assigned: {
      type: User,
      resolve(todo) {
         console.log(`---------todo: assigned call-----------`);
        return todo.getAssign();
      }
    }
  })
});

export default Todo;