const graphql = require('graphql');
// const GraphQLObjectType = graphql.GraphQLObjectType;
// const GraphQLBoolean = graphql.GraphQLBoolean;
const GraphQLString = graphql.GraphQLString;
// const GraphQLNonNull = graphql.GraphQLNonNull;
// const GraphQLJSON = require('graphql-type-json');
// const models = require('./../../graph/models');
// const parameters = require('./../../../config/parameters');


module.exports = {
  testRoute: {
    name: 'testRoute',
    type: GraphQLString,
    args: {},
    resolve: async () => {
      return 'API is running !';
    }
  }
};
