const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");

const GraphQLJSON = require("graphql-type-json");
const models = require("../../models");
const Attachment = require('../types/attachmentType');

const createAttachement = {
	type: Attachment,
	args: {
		todo_id: {
      type: GraphQLInt
    },
		step_id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    drive_id: {
      type: GraphQLString
    }
	},
	resolve(root, args, ctx) {
    let data = {...args, user_id: ctx.user.id};
		return models.Attachment.create(data);
	}
}

const updateAttachement = {
	type: Attachment,
	args: {
		id: {
      type: GraphQLInt
    },
		todo_id: {
      type: GraphQLInt
    },
		step_id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    }
	},
	resolve(_, args, ctx) {
    let data = {...args, user_id: user.id};
    return models.Attachment.update(args.data, { where: { id: args.id } })
      .then(company => models.Attachment.findOne({ where: args.id }));
	}
}

module.exports = {
  createAttachement,
  updateAttachement
}
