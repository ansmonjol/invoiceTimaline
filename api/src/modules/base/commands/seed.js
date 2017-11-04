const coAction = require('./../../../libraries/coAction');
const models = require('./../../graph/models');
const seedAccount = require('./../helpers/seed/account');
const seedUser = require('./../helpers/seed/user');
const seedCustomer = require('./../helpers/seed/customer');
const seedInvoice = require('./../helpers/seed/invoice');
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
        total: 6,
      });
      bar.tick({ token1: 'Sync Database' });
      await models.sequelize.sync({ force: true, logging: false });

      bar.tick({ token1: 'accounts....' });
      const accounts = JSON.parse(JSON.stringify(await seedAccount(models)));

      bar.tick({ token1: 'users....' });
      await seedUser(models, accounts);

      bar.tick({ token1: 'customers....' });
      await seedCustomer(models, accounts);

      bar.tick({ token1: 'customers....' });
      await seedInvoice(models, accounts);

      bar.tick({ token1: 'finish' });
      process.exit(0);
      return true;
    }
  }));
}];
