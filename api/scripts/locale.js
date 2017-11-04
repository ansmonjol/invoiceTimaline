/**
 * Locale configuration
 * This file is private must not preset in git
 * @type {Object}
 */
module.exports = {
  // Express application port
  APPLICATION_PORT: 3000,

  // Environnement executed current application
  ENVIRONNEMENT_APPLICATION: 'development', // (development | production)

  // Database configuration
  // 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql'
  DATABASE: 'postgres://user_name:root@localhost:5432/db_name',

  DATABASE_TESTING: 'postgres://user_name:root@localhost:5432/dn_name_test',

  // Update
  // SENTRY: true,
};
