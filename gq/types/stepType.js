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
const { createBatchResolver } = require('graphql-resolve-batch');
const models = require("../../models");

const Step = new GraphQLObjectType({
  name: "step",
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    content: {
      type: GraphQLString
    },
    position: {
      type: GraphQLInt
    },
    created_at: {
      type: GraphQLString
    },
    author: {
      type: User,
      resolve(step) {
        console.log('step author');
        return step.getUser();
      }
    },
    attachments: {
      type: new GraphQLList(Attachment),
      resolve: createBatchResolver(async (steps, args) => {
        const keys = steps.map(step => step.id);
        const query = {where: {step_id: {in: keys}}};
        let attachments = await models.Attachment.findAll(query);
        return keys.map(key => attachments.filter(att => att.step_id == key));

      })
      // resolve: (step, args) {
      //   console.log('==============attachments===========');
      //   return step.getAttachments(args);
      // }
    }
  })
});

module.exports = Step;
