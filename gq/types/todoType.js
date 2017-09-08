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
      resolve(todo, args) {
        return todo.getSteps(args);
      }
    },
    author: {
      type: User,
      resolve(todo, args) {
        return todo.getUser(args);
      }
    },
    assigned: {
      type: User,
      resolve(todo, args) {
        return todo.getAssigned();
      }
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
