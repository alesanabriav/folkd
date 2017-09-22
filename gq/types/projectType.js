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
const models = require("../../models");
const { createBatchResolver } = require('graphql-resolve-batch');

const Project = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: { type: GraphQLInt },
    client_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    todosCount: {
      type: GraphQLInt,
      resolve(project, args, ctx) {
        return 5;
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
          }
        },
        resolve: createBatchResolver(async function(sources, args, context) {

          const keys = sources.map(({id}) => id);
          const query = {...args, where: {...args.where, project_id: { in: keys } }};
          let todos = await models.Todo.findAll(query);

          todos = keys.map(key => {
            return todos.filter(todo => todo.project_id == key);
          })

          return todos;
        })

      // resolve(project, args) {
      //   // return todosLoader.load(project.id);
      //   return project.getTodos(args);
      // }
    }
  })
});

module.exports = Project;
