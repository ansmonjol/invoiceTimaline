const graphql = require('graphql');
const GraphQLInt = graphql.GraphQLInt;
const GraphQLString = graphql.GraphQLString;
const GraphQLBoolean = graphql.GraphQLBoolean;
const GraphQLFloat = graphql.GraphQLFloat;
const GraphQLEnumType = graphql.GraphQLEnumType;
const GraphQLList = graphql.GraphQLList;
const GraphQLJSON = require('graphql-type-json');

let customTypeMapper;

/*
 * Checks the type of the sequelize data type and
 * returns the corresponding type in GraphQL
 * @param  {Object} sequelizeType
 * @param  {Object} sequelizeTypes
 * @return {Function} GraphQL type declaration
 */
module.exports = function toGraphQL(sequelizeType, sequelizeTypes) {

  // did the user supply a mapping function?
  // use their mapping, if it returns truthy
  // else use our defaults
  if (customTypeMapper) {
    const result = customTypeMapper(sequelizeType);
    if (result) return result;
  }

  const {
    BOOLEAN,
    ENUM,
    FLOAT,
    CHAR,
    DECIMAL,
    DOUBLE,
    INTEGER,
    BIGINT,
    STRING,
    TEXT,
    UUID,
    JSONB,
    DATE,
    DATEONLY,
    TIME,
    ARRAY,
    VIRTUAL
  } = sequelizeTypes;


  // Regex for finding special characters
  const specialChars = /[^a-z\d_]/i;

  if (sequelizeType instanceof BOOLEAN) return GraphQLBoolean;

  if (sequelizeType instanceof FLOAT ||
      sequelizeType instanceof DOUBLE) return GraphQLFloat;

  if (sequelizeType instanceof INTEGER) {
    return GraphQLInt;
  }

  if (sequelizeType instanceof CHAR ||
      sequelizeType instanceof STRING ||
      sequelizeType instanceof TEXT ||
      sequelizeType instanceof UUID ||
      sequelizeType instanceof DATE ||
      sequelizeType instanceof DATEONLY ||
      sequelizeType instanceof TIME ||
      sequelizeType instanceof BIGINT ||
      sequelizeType instanceof DECIMAL) {
    return GraphQLString;
  }
  if (sequelizeType instanceof ARRAY) {
    const elementType = toGraphQL(sequelizeType.type, sequelizeTypes);
    return new GraphQLList(elementType);
  }

  if (sequelizeType instanceof ENUM) {
    return new GraphQLEnumType({
      values: sequelizeType.values.reduce((obj, value) => {
        let sanitizedValue = value;
        if (specialChars.test(value)) {
          sanitizedValue = value.split(specialChars).reduce((reduced, val, idx) => {
            let newVal = val;
            if (idx > 0) {
              newVal = `${val[0].toUpperCase()}${val.slice(1)}`;
            }
            return `${reduced}${newVal}`;
          });
        }
        obj[sanitizedValue] = { value };
        return obj;
      }, {})
    });
  }

  if (sequelizeType instanceof JSONB) {
    return GraphQLJSON;
  }

  if (sequelizeType instanceof VIRTUAL) {
    const returnType = sequelizeType.returnType
        ? toGraphQL(sequelizeType.returnType, sequelizeTypes)
        : GraphQLString;
    return returnType;
  }

  if (typeof sequelizeType === 'object') {
    return GraphQLJSON;
  }

  throw new Error(`Unable to convert ${sequelizeType.key || sequelizeType.toSql()} to a GraphQL type`);
};
