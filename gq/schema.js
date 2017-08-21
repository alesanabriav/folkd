const {
  GraphQLSchema,
  GraphQLObjectType
} = require("graphql");

//queries
const clientsQuery = require('./queries/clientsQuery');
const projectsQuery = require('./queries/projectsQuery');
const todosQuery = require('./queries/todosQuery');
const todoQuery = require('./queries/todoQuery');
const usersQuery = require('./queries/usersQuery');

const Query = new GraphQLObjectType({
  name: "folkderAppQueries",
  description: "Root Schema",
  fields: () => ({
    clients: clientsQuery,
    projects: projectsQuery,
    todos: todosQuery,
    todo: todoQuery,
    users: usersQuery
  })
});

// const Mutation = new GraphQLObjectType({
//   name: "folkderAppMutations",
//   fields: () => ({
//     createCompany,
//     updateCompany,
//     createClient,
//     updateClient,
//     createProject,
//     updateProject,
//     createTodo,
//     updateTodo,
//     createStep
//   })
// });

const Schema = new GraphQLSchema({
  query: Query,
  // mutation: Mutation
});

module.exports = Schema;
