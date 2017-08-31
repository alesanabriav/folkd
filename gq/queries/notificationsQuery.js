const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require ("graphql");
const GraphQLJSON = require("graphql-type-json");
const Notification = require("../types/notificationType");
const models = require("../../models");

const notifications = {
  type: new GraphQLList(Client),
  args: {
    limit: { type: GraphQLInt },
    order: { type: GraphQLJSON }
  },
  resolve(_, args, ctx, info) {
    let where = {...args.where, user_id: ctx.user.id};
    return models.Notification.findAll({...args, where });
  }
};

module.exports = notifications;
