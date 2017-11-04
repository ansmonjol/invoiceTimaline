
const path = require('path');

/**
 * Configuration application, mandrill, twillo, google etc...
 * @type {Object}
 */
module.exports = {

  APPLICATION_NAME: 'BillyPay API',

  // Version of application
  APPLICATION_VERSION: '1.0.0',

  TIME_ZONE: 'Europe/Paris',

  /**
   * Modules installed in application
   * Each module is block-codes isolled
   */
  MODULES: [
    'file',
    'base',
    'notifications',
    'account',
    'graph',
  ],

  // Root application
  APPLICATION_DIR: path.join(__dirname, '../'),

};
