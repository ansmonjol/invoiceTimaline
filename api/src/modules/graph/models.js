const Sequelize = require('sequelize');
const parameters = require('./../../config/parameters');
const ModuleLoader = require('../../libraries/ModuleLoader');

// Application parameters
const localeConfig = require('./../../config/locale');
const databasePath = process.env.NODE_ENV !== 'testing' ? localeConfig.DATABASE : localeConfig.DATABASE_TESTING;
const sequelize = new Sequelize(databasePath, {
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  logging: false
});

const db = {};

const moduleLoader = new ModuleLoader(parameters.MODULES, null, 'modules', true);
const mds = moduleLoader.getComponents('models');
for (let m = 0; m < mds.length; m++) {
  const file = mds[m];
  if (__filename !== file) {
    const model = sequelize.import(file);
    db[model.name] = model;
  }
}

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
