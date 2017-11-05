const shell = require('shelljs');
const path = require('path');

// Load koa application
const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('koa-cors');
const serve = require('koa-static');
const convert = require('koa-convert');

// Libraries
const ModuleLoader = require('../libraries/ModuleLoader');

// Application parameters
const parameters = require('./parameters');
const localeConfig = require('./locale');

// Init application
const app = new Koa();
app.use(convert(cors({ methods: 'GET,HEAD,PUT,POST,PATCH,DELETE' })));
const pathMusicUploads = path.join(__dirname, '../../public', 'files');
shell.mkdir('-p', pathMusicUploads);
app.use(serve(path.join(__dirname, '../../public')));

// Set env
app.env = localeConfig.ENVIRONNEMENT_APPLICATION || 'development';

// Logger
app.use(logger());

// Load all module
// Parameters: modules list, app, modules dir
const moduleLoader = new ModuleLoader(parameters.MODULES, app, 'modules');
moduleLoader.www();

module.exports = app;
