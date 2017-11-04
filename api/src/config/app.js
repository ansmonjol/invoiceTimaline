
// Load koa application
const Koa = require('koa');
const logger = require('koa-logger');
// const Raven = require('raven');
// Libraries
const ModuleLoader = require('../libraries/ModuleLoader');
// Application parameters
const parameters = require('./parameters');
const localeConfig = require('./locale');
const cors = require('koa-cors');
const shell = require('shelljs');
const path = require('path');
const serve = require('koa-static');
const convert = require('koa-convert');

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

if (localeConfig.ENVIRONNEMENT_APPLICATION === 'production') {
  // Raven.config('https://233ddf39a6794a549647116f77d8b378:6c1611682c594271a8a996821104f51f@sentry.io/135319').install();
  // app.on('error', (err) => {
  //   Raven.captureException(err, (eventId) => {
  //     console.log(`Reported error ${eventId}`);
  //   });
  // });
}
module.exports = app;
