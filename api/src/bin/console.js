#!/usr/bin/env node

'use strict';

const program = require('commander');

// Application parameters
const parameters = require('../config/parameters');
const Logger = require('./../libraries/Logger');
const ModuleLoader = require('./../libraries/ModuleLoader');

// Programe version
program.version(parameters.APPLICATION_VERSION);

// Log
Logger.log(`${parameters.APPLICATION_NAME} (${parameters.APPLICATION_VERSION}) console application launch`, 'yellow');


// Load all module
// Parameters: modules list, app, modules dir
const moduleLoader = new ModuleLoader(parameters.MODULES, null, 'modules', true);
moduleLoader.program(program);
