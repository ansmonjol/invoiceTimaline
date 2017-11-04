const send = require('koa-send');

/**
 * Restful Controller
 */
class LoadController {

  static async action(ctx) {
    try {
      const id = ctx.params.id;
      const name = ctx.query.name;

      const fileUrl = `public/files/${id}`;

      ctx.attachment(name);
      await send(ctx, fileUrl);
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        meta: {
          status: 'error',
          error: e.message
        }
      };
      return;
    }
  }
}

module.exports = LoadController;
