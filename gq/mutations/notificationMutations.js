const {
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
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

const updateNotification = {
	type: Notification,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    url: {
      type: GraphQLString
    },
    is_read: {
      type: GraphQLBoolean
    }
  },
  resolve(root, args) {
    return models.Notification.update(args, { where: { id: args.id } }).then(() => {
      return models.Notification.findById(args.id);
    });
  }
};

module.exports = {
  createNotification,
  updateNotification
}
