const graphql = require('graphql');
const graph = require('./graph');
const subdomain = require('./helpers/subdomain');
const models = require('./models');
const Raven = require('raven');
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
      let user = null;
      let language = 'fr';
      const accountURL = process.env.NODE_ENV !== 'testing' ? subdomain(ctx.headers.host) : 'account0';
      if (accountURL) {
        try {
          account = await models.Account.find({ where: { accountId: accountURL } });
          // Get account id by url
          if (account && account.id) {
            accountId = account.id;
          }
        } catch (e) {
          if (localeConfig.ENVIRONNEMENT_APPLICATION === 'production') Raven.captureException(e, { tags: { query } });
          accountId = null;
        }
      }

      // Add language in query
      if (accountId !== null) {
        if (!!ctx.request.headers.authorization) {
          let token = null;
          try {
            token = await TokenHelper.getToken(ctx.request, accountId);
          } catch (e) { token = null; }
          if (!!token && !!token.user && !!token.user.language) {
            language = token.user.language;
            user = token.user;
          } else if (!!token && !!token.account && !!token.account.language) {
            language = token.account.language;
          }
        } else {
          language = account.language;
        }
      } else {
        language = 'fr';
      }

      const data = await graphql.graphql(graph, query, null, { ctx, accountId, account, user, language, query });
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
          if (localeConfig.ENVIRONNEMENT_APPLICATION === 'production') Raven.captureException(e, { tags: { accountId, account, query } });
          return console.log(e);
        });
      } else {
        ctx.status = 200;
        ctx.body = { meta: { status: 'ok' }, data: data.data };
      }
    } catch (e) {
      console.log(e);
      if (localeConfig.ENVIRONNEMENT_APPLICATION === 'production') Raven.captureException(e);
      ctx.status = 500;
      ctx.body = { meta: { status: 'error', error: e.message } };
    }
  }
}

module.exports = Controller;
