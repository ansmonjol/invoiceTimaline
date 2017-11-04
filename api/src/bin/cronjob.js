#!/usr/bin/env node

'use strict';

// Load locale configuration for use port, env, database
const models = require('./../modules/graph/models');
const ModuleLoader = require('./../libraries/ModuleLoader');

// Application parameters
const parameters = require('../config/parameters');

// Launch application
models.sequelize.sync({ force: false }).then(() => {
  const moduleLoader = new ModuleLoader(parameters.MODULES, null, 'modules', true);
  moduleLoader.cronjob();
});
