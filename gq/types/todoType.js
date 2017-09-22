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
const Assign = require('./assignType');
const User = require('./userType');
const Step = require('./stepType');
const Attachment = require('./attachmentType');
const models = require("../../models");
const { createBatchResolver } = require('graphql-resolve-batch');

const Todo = new GraphQLObjectType({
  name: "todo",
  fields: () => ({
    id: { type: GraphQLInt },
    project_id: { type: GraphQLInt },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    deadline_start: { type: GraphQLString },
    deadline_end: { type: GraphQLString },
    created_at: { type: GraphQLString },
    is_completed: { type: GraphQLBoolean },
    steps: {
      type: new GraphQLList(Step),
      args: {
        where: { type: GraphQLJSON },
        order: { type: GraphQLJSON },
        limit: { type: GraphQLInt }
      },
      resolve: createBatchResolver((todos, args) => {
        const keys = todos.map(todo => todo.id);
        const query = { ...args, where: { ...args.where, todo_id: {in: keys} } };
        let steps = models.Step.findAll(query);
        steps = keys.map(key => steps.filter(step => step.todo_id == key));
        return steps;
      })
    },
    author: {
      type: User,
      resolve(todo, args) {
        console.log('--------------user todo---------');
        return todo.getUser(args);
      }
    },
    assigned: {
      type: User,
      resolve: createBatchResolver(async (todos, args) => {
        const keys = todos.map(todo => {
          return todo.assign_id;
        });

        const query = { where:  {id: {in: keys} } };
        let users = await models.User.findAll(query);

        users = keys.map((key) => {
          return users.filter(user => {
            return user.id == key
          })[0];
        });

        return users;
      })
    },
    attachments: {
      type: new GraphQLList(Attachment),
      resolve(todo, args) {

        return todo.getAttachments(args);
      }
    }
  })
});

module.exports = Todo;
