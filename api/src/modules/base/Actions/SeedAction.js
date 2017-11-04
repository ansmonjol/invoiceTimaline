
const models = require('./../../graph/models');
const seedAccount = require('./../helpers/seed/account');
const seedUser = require('./../helpers/seed/user');
const seedCustomer = require('./../helpers/seed/customer');
const seedProject = require('./../helpers/seed/project');
const seedTime = require('./../helpers/seed/time');
const seedExpense = require('./../helpers/seed/expense');
const seedOrganization = require('./../helpers/seed/organization');

class SeedAction {

  async onAction() {
    // Add seed resources
    console.log('Adding seeds...');
    await models.sequelize.sync({ force: true, logging: false });
    const accounts = await seedAccount(models);
    await seedOrganization(models, accounts);
    await seedUser(models, accounts);
    await seedCustomer(models, accounts);
    await seedProject(models, accounts);
    await seedTime(models, accounts);
    await seedExpense(models, accounts);
    return true;
  }
}

module.exports = SeedAction;
