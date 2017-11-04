const models = require('./../models');
const typeMapper = require('./../helpers/typeMapper');
const graphql = require('graphql');
const GraphQLString = graphql.GraphQLString;

module.exports = function attrs(modelName) {
  const Model = models[modelName];
  const fields = {};
  Object.keys(Model.rawAttributes).reduce((memo, key) => {
    const attribute = Model.rawAttributes[key];
    const type = attribute.type;
    fields[key] = {
      type: typeMapper(type, Model.sequelize.constructor),
      description: `${key} field`
    };
    return true;
  });

  fields.id = { type: GraphQLString, description: 'id field' };
  return fields;
};
