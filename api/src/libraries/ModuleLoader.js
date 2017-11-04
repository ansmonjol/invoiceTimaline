const parameters = require('./../config/parameters');
const path = require('path');
const async = require('async');
const router = require('koa-router')();
const ArgumentName = require('./ArgumentName');
const Logger = require('./Logger');
const CronJob = require('cron').CronJob;
const glob = require('glob');

class ModuleLoader {

  constructor(apps, app, dirApp, silent) {
    this.apps = apps || parameters.MODULES;
    this.dir = path.join(parameters.APPLICATION_DIR, dirApp || 'modules');
    this.app = app || {};
    if (!silent && process.env.NODE_ENV !== 'testing') {
      for (const m of this.getModules()) {
        Logger.log(`Module loaded: ${m}`, 'white');
      }
    }
  }

  /**
   * Load module
   * @return {[type]} [description]
   */
  getModules() {
    return this.apps || parameters.MODULES;
  }

  /**
   * Load directory
   * @return {[type]} [description]
   */
  getDirApp() {
    return this.dir || path.join(parameters.APPLICATION_DIR, 'modules');
  }

  /**
   * Load module
   * @return {[type]} [description]
   */
  www() {
    this.config('init');
    this.routes();
  }

  graphql(fields) {
    const schemas = this.getComponents('schema');
    for (let s = 0; s < schemas.length; s++) {
      try {
        const cFile = schemas[s];
        const schema = require(cFile);
        const keys = Object.keys(schema);
        for (let k = 0; k < keys.length; k++) {
          if (fields[keys[k]]) Logger.log(`Warning: <${keys[k]}> key graph already exists, Duplicated in ${cFile}`, 'yellow');
          fields[keys[k]] = schema[keys[k]];
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  config(ctx) {
    // Load configuration of module
    const configs = this.getComponents('config');

    async.eachSeries(configs, (cFile, callback) => {
      try {
        const config = require(cFile);
        if (config && config[ctx]) {
          const argumentList = ArgumentName.getParamNames(config[ctx]);
          const _arguments = [this.app];

          // Use callback or not use callback
          if (argumentList.length === 1) {
            config[ctx].apply(this, _arguments);
            callback();
          } else {
            _arguments.push(callback);
            config[ctx].apply(this, _arguments);
          }
        } else {
          callback();
        }
      } catch (e) {
        console.log(e);
        callback();
      }
    });
  }

  /**
   * Load all routes
   * @return {[type]} [description]
   */
  routes() {
    // Load routes of module
    const routes = this.getComponents('routes');
    async.eachSeries(routes, (rFile, callback) => {
      try {
        const routerModule = require(rFile);
        if (typeof routerModule === 'function') {
          routerModule(router);
          callback();
        } else {
          callback();
        }
      } catch (e) {
        console.log(e);
        console.log(e.stack);
        callback();
      }
    }, () => {
      this.app
      .use(router.routes())
      .use(router.allowedMethods());
    });
  }

  // Load files in all apps
  getComponents(type) {
    let components = [];
    for (const m of this.getModules()) {
      const file = glob.sync(path.resolve(this.getDirApp(), m, `${type}.js`));
      const files = glob.sync(path.resolve(this.getDirApp(), m, `${type}**/*.js`));
      components = components.concat(file);
      components = components.concat(files);
    }
    return components;
  }

  /**
   * Load all commands with commander
   * @return {[type]} [description]
   */
  program(program) {
    const commands = this.getComponents('commands');

    this.config('initConsole');
    async.each(commands, (cFile, callback) => {
      const command = require(cFile);
      command.forEach((c) => {
        c(program);
      });
      callback();
    }, () => {
      program.parse(process.argv);
    });
  }

  cronjob() {
    const jobsFiles = this.getComponents('jobs');
    const jobsList = [];

    this.config('initCronJob');
    async.each(jobsFiles, (jFile, callback) => {
      const jobs = require(jFile);
      async.each(jobs, (j, ca) => {
        try {
          if (!j.disabled) {
            const job = new CronJob({ cronTime: j.cronTime, onTick: j.onTick, start: false, timeZone: parameters.TIME_ZONE });
            jobsList.push(job);
          }
          ca();
        } catch (e) {
          Logger.log(`CronJob is invalid: ${j.cronTime}, ${jFile}`, 'red');
          ca();
        }
      }, callback);
    }, () => {
      jobsList.forEach((_job) => {
        _job.start();
      });
    });
  }
}

module.exports = ModuleLoader;
