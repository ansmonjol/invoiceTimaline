const graphql = require('graphql');
const graph = require('./graph');
const subdomain = require('./helpers/subdomain');
const models = require('./models');
const localeConfig = require('./../../config/locale');
const TokenHelper = require('./../account/helpers/TokenHelper');

// const messages = await (require('./../base/messages'))('fr');
// console.log(messages);

class Controller {
  static async graph(ctx) {
    try {
      const query = ctx.request.body.query;

      // Load account id
      let accountId = null;
      let account = null;
      let userId = null;
      let user = null;

      // Find Account id in authorization, for mobile and test
      if (ctx.request.headers.authorization) {
        // Get accout & user ids from headers
        const { headerAccountId, headerUserId } = TokenHelper.decodeAuthorization(ctx.request.headers.authorization);
        console.log('headerAccountId, headerUserId', headerAccountId, headerUserId);
        if (!!headerAccountId) accountId = headerAccountId;
        if (!!headerUserId) userId = headerUserId;
      }

      if (accountId) {
        try {
          account = await models.Account.find({ where: { id: accountId } });
          // Get account id by url
          if (account && account.id) {
            accountId = account.id;
          }
        } catch (e) {
          accountId = null;
        }
      }

      if (user) {
        try {
          user = await models.User.find({ where: { id: userId } });
          // Get user id by url
          if (user && user.id) {
            userId = user.id;
          }
        } catch (e) {
          userId = null;
        }
      }

      const data = await graphql.graphql(graph, query, null, { ctx, accountId, account, userId, user, query });
      if (data.errors) {
        ctx.status = 500;
        for (let i = 0; i < data.errors.length; i++) {
          const err = data.errors[i];
          if (err.message === '__denied__') {
            ctx.status = 403;
          }

          if (err.message === '__free_account_quota_reached__') {
            ctx.status = 423;
          }

          if (err.message === '__wrong_card_infos__') {
            ctx.status = 424;
          }
        }
        ctx.body = { meta: { status: 'error', errors: data.errors } };

        data.errors.map((e) => {
          return console.log(e);
        });
      } else {
        ctx.status = 200;
        ctx.body = { meta: { status: 'ok' }, data: data.data };
      }
    } catch (e) {
      console.log(e);
      ctx.status = 500;
      ctx.body = { meta: { status: 'error', error: e.message } };
    }
  }
}

module.exports = Controller;
