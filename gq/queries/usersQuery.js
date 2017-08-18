import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import User from "../types/userType";
import models from "../../models";

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

export default users;
