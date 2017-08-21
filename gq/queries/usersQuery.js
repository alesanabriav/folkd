const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const User = require("../types/userType");
const models = require("../../models");

console.log('type', User);

const usersFilter = new GraphQLInputObjectType({
    name: "usersFilters",
    fields: () => ({
      name: { type: GraphQLJSON }
    })
});

const users = {
  type: new GraphQLList(User),
  args: {
    where: {type: usersFilter},
    limit: { type: GraphQLInt },
    order: { type: GraphQLJSON }
  },
  resolve(root, args, ctx) {
    let where = {...args.where, company_id: ctx.user.company_id};
    console.log(`---------users query-----------`);
    return models.User.findAll({...args, where });
  }
};

module.exports = users;
