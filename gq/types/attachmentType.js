const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
import models from "../../models";

const Attachment = new GraphQLObjectType({
  name: "attachment",
  fields: () => ({
    id: { type: GraphQLInt },
    url: { type: GraphQLString }
    }
});

export default Attachment;
