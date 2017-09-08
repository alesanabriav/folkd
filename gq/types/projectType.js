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
const Todo = require('./todoType');

const Project = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: { type: GraphQLInt },
    client_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    todosCount: {
      type: GraphQLInt,
      resolve(project, args, ctx) {
        return project.getTodos({ attributes: ['id'] })
          .then(todos => todos.length);
      }
    },
    todos: {
      type: new GraphQLList(Todo),
        args: {
          where: {
            type: GraphQLJSON
          },
          order: {
            type: GraphQLJSON
          },
          limit: {
            type: GraphQLInt
          },
          is_completed: {
            type: GraphQLBoolean
          }
        },
      resolve(project, args) {
        return project.getTodos(args);
      }
    }
  })
});

module.exports = Project;
