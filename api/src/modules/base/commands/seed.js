const coAction = require('./../../../libraries/coAction');
const models = require('./../../graph/models');
const seedAccount = require('./../helpers/seed/account');
const seedUser = require('./../helpers/seed/user');
const seedCustomer = require('./../helpers/seed/customer');
const seedProject = require('./../helpers/seed/project');
const seedTime = require('./../helpers/seed/time');
const seedExpense = require('./../helpers/seed/expense');
const seedOrganization = require('./../helpers/seed/organization');
const ProgressBar = require('progress');
const colors = require('colors');

module.exports = [(program) => {
  program
  .command('task:seed')
  .description('Add seed in database')
  .action(coAction(class command {
    async onAction() {
      // Add seed resources
      const bar = new ProgressBar(colors.white('Seed runner [:bar] ') + colors.green(':percent :token1'), {
        complete: ':',
        incomplete: ' ',
        width: 50,
        total: 9
      });
      bar.tick({ token1: 'Sync Database' });
      await models.sequelize.sync({ force: true, logging: false });

      bar.tick({ token1: 'accounts....' });
      const accounts = await seedAccount(models);

      bar.tick({ token1: 'organizations....' });
      await seedOrganization(models, accounts);

      bar.tick({ token1: 'users....' });
      await seedUser(models, accounts);

      bar.tick({ token1: 'customers....' });
      await seedCustomer(models, accounts);

      bar.tick({ token1: 'projects....' });
      await seedProject(models, accounts);

      bar.tick({ token1: 'times...' });
      await seedTime(models, accounts);

      bar.tick({ token1: 'expenses....' });
      await seedExpense(models, accounts);

      bar.tick({ token1: 'finish' });
      return true;
    }
  }));
}];
