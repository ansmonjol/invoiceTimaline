const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const ModuleLoader = require('../../libraries/ModuleLoader');
const parameters = require('./../../config/parameters');

const fields = { hello: { type: GraphQLString, resolve() { return 'world'; } } };

// Populate Graph
const moduleLoader = new ModuleLoader(parameters.MODULES, null, 'modules', true);
moduleLoader.graphql(fields);

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({ name: 'RootQueryType', fields })
});
