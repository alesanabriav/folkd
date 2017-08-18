import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import Company from './companyType';

const User = new GraphQLObjectType({
  name: "user",
  description: "Represent a user",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: {
      type: GraphQLString
    },
    email: { type: GraphQLString },
    company: {
      type: Company,
      resolve(user) {
        return user.getCompany();
      }
    }
  })
});

export default User;
