import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import Todo from './todoType';

const Project = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: { type: GraphQLInt },
    client_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    todosCount: {
      type: GraphQLInt,
      resolve(project) {
        return project.getTodos({ attributes: ['id'] }).then(todos => todos.length);
      }
    },
    todos: {
      type: new GraphQLList(Todo),
        args: {
          where: { type: GraphQLJSON },
          order: { type: GraphQLJSON },
          limit: { type: GraphQLInt }
        },
      resolve(project, args) {
        console.log(`---------projects query todos-----------`);
        return project.getTodos(args);
      }
    }
  })
});

export default Project;