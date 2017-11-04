const graphql = require('graphql');
// const GraphQLObjectType = graphql.GraphQLObjectType;
// const GraphQLBoolean = graphql.GraphQLBoolean;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLJSON = require('graphql-type-json');
// const models = require('./../../graph/models');
const SchemaHelper = require('./../helpers/SchemaHelperAccount');
// const parameters = require('./../../../config/parameters');


module.exports = {
  login: {
    name: 'login',
    type: GraphQLJSON,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      const schemaHelper = new SchemaHelper();
      return await schemaHelper.login(args);
    }
  },
};
