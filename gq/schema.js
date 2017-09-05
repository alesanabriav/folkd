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
const userQuery = require('./queries/userQuery');
const notificationsQuery = require('./queries/notificationsQuery');

//mutations
const { createCompany, updateCompany } = require('./mutations/companyMutations');
const { createClient, updateClient } = require('./mutations/clientMutations');
const { createProject, updateProject } = require('./mutations/projectMutations');
const { loginUser, registerUser } = require('./mutations/userMutations');
const { createTodo, updateTodo } = require('./mutations/todoMutations');
const { createStep } = require('./mutations/stepMutations');
const { createAttachment, updateAttachment } = require('./mutations/attachmentMutations');
const { createNotification, updateNotification } = require('./mutations/notificationMutations');

const Query = new GraphQLObjectType({
  name: "folkderAppQueries",
  description: "Root Schema",
  fields: () => ({
    clients: clientsQuery,
    projects: projectsQuery,
    todos: todosQuery,
    todo: todoQuery,
    users: usersQuery,
    user: userQuery,
    notifications: notificationsQuery
  })
});

const Mutation = new GraphQLObjectType({
  name: "folkderAppMutations",
  fields: () => ({
    createCompany,
    updateCompany,
    createClient,
    updateClient,
    createProject,
    updateProject,
    createTodo,
    updateTodo,
    createStep,
    createAttachment,
    updateAttachment,
    createNotification,
    updateNotification
  })
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = Schema;
