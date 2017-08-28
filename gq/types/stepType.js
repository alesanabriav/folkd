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
const User = require('./userType');
const Attachment = require('./attachmentType');

const Step = new GraphQLObjectType({
  name: "step",
  fields: () => ({
    id: { type: GraphQLInt },
    content: { type: GraphQLString },
    position: { type: GraphQLInt },
    created_at: { type: GraphQLString },
    author: {
      type: User,
      resolve(step) {
        // console.log('-----------step author=-------------');
        return step.getUser();
      }
    },
    attachment: {
      type: new GraphQLList(Attachment),
      resolve(step) {
        //  console.log(`---------step: attachment call-----------`);
        return step.getAttachments();
      }
    }
  })
});

module.exports = Step;
