const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = "graphql";
const GraphQLJSON = "graphql-type-json";
const AWS = 'aws-sdk';
const models = "../../models";
const s3 = new AWS.S3();

// var params = {Bucket: 'bucket', Key: 'key', Body: stream};

// s3.upload(params, function(err, data) {
//   console.log(err, data);
// });


export const createAttachement = {
	type: Client,
	args: {
		name: { type: new GraphQLNonNull(GraphQLString) },
    abbreviation: { type: GraphQLString },
	},
	resolve(root, args, ctx) {
    let data = {...args, company_id: ctx.user.company_id};
		return models.Client.create(data);
	}
}
