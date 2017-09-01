const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
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
    todosAssignedCount: {
      type: GraphQLInt,
      resolve(project, args, ctx) {
        const user = ctx.user;
        return project.getTodos({ attributes: ['id', 'assign_id'] })
          .then(todos => todos.filter(todo => todo.assign_id == user.id).length );
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
        // console.log(`$---------projects query todos-----------`);
        return project.findOne({ include: [{model: models.Todo, ...args}] });
      }
    }
  })
});

module.exports = Project;
