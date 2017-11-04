const path = require('path');
const fs = require('fs');

/**
 * Restful Controller
 */
class Controller {

  static async action(ctx) {
    try {
      const filename = ctx.query.filename + path.extname(ctx.query.file);
      ctx.attachment(filename);
      const _path = path.join(__dirname, '../../../public/files/') + ctx.query.file;
      // Send the file.
      ctx.body = fs.readFileSync(_path);
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

module.exports = Controller;
