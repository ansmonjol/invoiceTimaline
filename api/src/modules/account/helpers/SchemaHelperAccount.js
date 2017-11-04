const models = require('../../graph/models');
const Hashes = require('jshashes');
const emitter = require('./../../base/emitter');
const geoip = require('geoip-lite');
/**
 * Restful Controller
 */
class SchemaHelper {
  /**
   * Retrieve user
   * @param  {String} email    user email
   * @param  {String} password user password
   * @return {Object}          user from DB
   */
  async login({ email, password }) {

    const passwordEncrypted = new Hashes.SHA256().hex(password);
    const record = await models.User.find({
      where: {
        email,
        password: passwordEncrypted,
        status: 100,
      },
      include: [
        {
          model: models.Account,
          as: 'account',
          where: {
            status: [100, 101, 102]
          }
        }
      ]
    });

    const row = {};

    // If user found
    if (record) {
      row.user = JSON.parse(JSON.stringify(record));
      row.account = row.user.account;
    }

    return row;
  }

}

module.exports = SchemaHelper;
