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
  DATABASE: 'postgres://alexandre:root@localhost:5432/pilotin',

  DATABASE_TESTING: 'postgres://alexandre:root@localhost:5432/pilotin',

  // Update
  SENTRY: true,

  // Domains
  DOMAIN: 'http://helloclients.com',
  DOMAIN_PREPROD: 'http://preprod.helloclients.com'

};
