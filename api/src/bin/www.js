#!/usr/bin/env node

'use strict';

// Load locale configuration for use port, env, database
const localeConfig = require('../config/locale');
const Logger = require('./../libraries/Logger');
const models = require('./../modules/graph/models');
const app = require('../config/app');

// Application parameters
const parameters = require('../config/parameters');

// // Launch application
models.sequelize.sync({ force: false }).then(() => {
  app.listen(localeConfig.APPLICATION_PORT || 3000, () => {
    Logger.log(`${parameters.APPLICATION_NAME} (${parameters.APPLICATION_VERSION}) application listening on port ${localeConfig.APPLICATION_PORT}`, 'green');
  });
});
