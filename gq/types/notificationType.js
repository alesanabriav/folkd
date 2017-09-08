const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const User = require('./userType');

const Notification = new GraphQLObjectType({
  name: "notification",
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    user_id: {
      type:  GraphQLInt
    },
    message: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    is_read: {
      type: GraphQLBoolean
    },
    user: {
      type: User,
      resolve(notification, args) {
        return notification.getUser(args);
      }
    }
  })
});

module.exports = Notification;
