const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLList = graphql.GraphQLList;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLFloat = graphql.GraphQLFloat;
const models = require('./../models');
const attributes = require('./../helpers/attributes');
const GraphQLJSON = require('graphql-type-json');
const emitter = require('./../../base/emitter');

const getQueries = function getQueries(params) {
  let queries = {};
  if (params._meta) {
    queries = JSON.parse(JSON.stringify(params._meta));
    delete params._meta;
    const where = JSON.parse(JSON.stringify(params));
    if (where && Object.keys(where).length) queries.where = where;
  } else {
    queries.where = JSON.parse(JSON.stringify(params));
  }

  return queries;
};

const pushAccountIdQueries = function pushAccountIdQueries(row, modelName, { accountId }) {
  if (
      (modelName === 'Customer') ||
      (modelName === 'Invoice') ||
      (modelName === 'User')
  ) {
    if (!accountId) throw new Error('__denied__');
    row.accountId = accountId;
  }

  if (modelName === 'Account') {
    if (!accountId) throw new Error('__denied__');
    row.id = accountId;
  }

  return row;
};

const map = {};
Object.keys(models).forEach((modelName) => {
  if (String(modelName) !== 'sequelize' && String(modelName) !== 'Sequelize') {
    const Model = models[modelName];
    const fields = attributes(modelName);
    const args = attributes(modelName);

    if ((modelName === 'AccountBillInvoice') && (modelName === 'AccountBill')) {
      return;
    }

    if (modelName !== 'Account') {
      map[`add${modelName}`] = {
        name: `add${modelName}`,
        type: GraphQLJSON,
        args,
        resolve: async (parent, values, { ctx, accountId, account, language }) => {
          if (modelName === 'Project' || modelName === 'Customer' || modelName === 'User') {
            // await safeFree(accountId, modelName);
          }
          const record = await Model.create(pushAccountIdQueries(values, modelName, { accountId }));
          emitter.emit(`add${modelName}`, { values, record, language });
          return record;
        }
      };

      map[`addBulk${modelName}`] = {
        name: `addBulk${modelName}`,
        type: GraphQLJSON,
        args: { values: { type: GraphQLJSON } },
        resolve: async (parent, { values }, { ctx, accountId, account, language }) => {
          if (modelName === 'Project' || modelName === 'Customer' || modelName === 'User') {
            // await safeFree(accountId, modelName);
          }
          const records = await Model.bulkCreate(JSON.parse(values));
          emitter.emit(`addBulk${modelName}`, { values, records, _models: models, language });
          return records;
        }
      };
    }

    map[`update${modelName}`] = {
      name: `update${modelName}`,
      type: GraphQLJSON,
      args,
      resolve: async (parent, values, { ctx, accountId, account, language }) => {
        const oldState = await Model.findById(values.id);
        await oldState.updateAttributes(values);
        const newState = await Model.findById(values.id);
        emitter.emit(`update${modelName}`, { values, oldState, newState, language });
        return newState;
      }
    };

    map[`archive${modelName}`] = {
      name: `archive${modelName}`,
      type: GraphQLJSON,
      args,
      resolve: async (parent, values, { ctx, accountId, account, language }) => {
        let record = await Model.findById(values.id);
        await record.updateAttributes({ status: 99 });
        record = await Model.findById(values.id);
        emitter.emit(`archive${modelName}`, { values, record, language });
        return record;
      }
    };

    if (modelName !== 'Account') {
      map[`destroy${modelName}`] = {
        name: `destroy${modelName}`,
        type: GraphQLInt,
        args,
        resolve: async (parent, values, { ctx, accountId, account, language }) => {
          const record = await Model.findById(values.id);
          await record.destroy();
          emitter.emit(`destroy${modelName}`, { values, record, language });
          return true;
        }
      };
    }

    args._meta = { type: GraphQLJSON, description: 'meta arg' };
    map[`one${modelName}`] = {
      name: `one${modelName}`,
      type: GraphQLJSON,
      args,
      resolve: async (parent, values, { ctx, accountId, account, language }) => {
        const queries = getQueries(values);

        // Manage custom incude
        if (queries.include && Model.getInclude) {
          queries.include = Model[include];
        } else {
          queries.include = Model.include || [];
        }

        queries.where = pushAccountIdQueries(queries.where || {}, modelName, { accountId });
        const record = await Model.find(queries);
        emitter.emit(`one${modelName}`, { queries, record, logging: console.log, language });
        return record;
      }
    };

    map[`list${modelName}`] = {
      name: `list${modelName}`,
      type: GraphQLJSON,
      args,
      resolve: async (parent, values, { ctx, accountId, account, language }) => {
        const queries = getQueries(values);

        // Manage custom incude
        if (queries.include && Model.getInclude) {
          queries.include = Model[include];
        } else {
          queries.include = Model.include || [];
        }

        // Check for custom where query
        if (queries.customWhere && queries.customWhere[1] !== null) {
          if (queries.where) {
            queries.where = await Model[queries.customWhere[0]](models, queries.where, queries.customWhere[1]);
          } else {
            queries.where = await Model[queries.customWhere[0]](models, {}, queries.customWhere[1]);
          }
        }


        queries.where = pushAccountIdQueries(queries.where || {}, modelName, { accountId });
        queries.offset = queries.offset || 0;
        queries.limit = queries.limit || 10;
        if (values._meta && values._meta.noLimit) delete queries.limit;
        queries.order = queries.order || Model.order;
        queries.loggin = console.log;
        console.log('queries', queries);
        const records = await Model.findAll(queries);
        emitter.emit(`list${modelName}`, { queries, records, language });
        return records;
      }
    };

    map[`count${modelName}`] = {
      name: `count${modelName}`,
      type: GraphQLInt,
      args,
      resolve: async (parent, values, { ctx, accountId, account, language }) => {
        const queries = getQueries(values);

        // Check for custom where query
        if (queries.customWhere && queries.customWhere[1] !== null) {
          if (queries.where) {
            queries.where = await Model[queries.customWhere[0]](models, queries.where, queries.customWhere[1]);
          } else {
            queries.where = await Model[queries.customWhere[0]](models, {}, queries.customWhere[1]);
          }
        }

        queries.where = pushAccountIdQueries(queries.where || {}, modelName, { accountId });
        const value = await Model.count(queries);
        emitter.emit(`count${modelName}`, { queries, value, language });
        return value;
      }
    };

    map[`sum${modelName}`] = {
      name: `sum${modelName}`,
      type: GraphQLFloat,
      args,
      resolve: async (parent, values, { ctx, accountId, account, language }) => {
        const queries = getQueries(values);
        queries.where = pushAccountIdQueries(queries.where || {}, modelName, { accountId });
        const value = await Model.sum(queries.field, queries);
        emitter.emit(`sum${modelName}`, { queries, value, language });
        return value;
      }
    };

    map[`min${modelName}`] = {
      name: `min${modelName}`,
      type: GraphQLFloat,
      args,
      resolve: async (parent, values, { ctx, accountId, account, language }) => {
        const queries = getQueries(values);
        queries.where = pushAccountIdQueries(queries.where || {}, modelName, { accountId });
        const value = await Model.min(queries.field, queries);
        emitter.emit(`min${modelName}`, { queries, value, language });
        return value;
      }
    };

    map[`max${modelName}`] = {
      name: `max${modelName}`,
      type: GraphQLFloat,
      args,
      resolve: async (parent, values, { ctx, accountId, account, language }) => {
        const queries = getQueries(values);
        queries.where = pushAccountIdQueries(queries.where || {}, modelName, { accountId });
        const value = await Model.max(queries.field, queries);
        emitter.emit(`max${modelName}`, { queries, value, language });
        return value;
      }
    };

    map[`avg${modelName}`] = {
      name: `avg${modelName}`,
      type: GraphQLFloat,
      args,
      resolve: async (parent, values, { ctx, accountId, account, language }) => {
        const queries = getQueries(values);
        queries.where = pushAccountIdQueries(queries.where || {}, modelName, { accountId });
        const value = await Model.aggregate(queries.field, 'avg', queries);
        emitter.emit(`avg${modelName}`, { queries, value, language });
        return value;
      }
    };

    map[`aggregate${modelName}`] = {
      name: `aggregate${modelName}`,
      type: GraphQLFloat,
      args,
      resolve: async (parent, values, { ctx, accountId, account, language }) => {
        const queries = getQueries(values);
        queries.where = pushAccountIdQueries(queries.where || {}, modelName, { accountId });
        const value = await Model.aggregate(queries.field, queries.function, queries);
        emitter.emit(`aggregate${modelName}`, { queries, value, language });
        return value;
      }
    };
  }
});

module.exports = map;
