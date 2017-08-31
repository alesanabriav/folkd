const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const models = require("../../models");
const Notification = require('../types/notificationType');

const createNotification = {
	type: Notification,
  args: {
    user_id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    message: {
      type: new GraphQLNonNull(GraphQLString)
    },
    url: {
      type: GraphQLString
    }
  },
  resolve(root, args) {
    console.log(args);
    return models.Notification.create(args);
  }
};

module.exports = {
  createNotification
}
