const faker = require('faker/locale/fr');
module.exports = async function accountSeed(models) {
  const values = [];
  for (let i = 0; i < 1; i++) values.push({ mail: faker.internet.email(), billingEmail: faker.internet.email(), name: faker.company.companyName(), accountId: `account${i}`, billableRate: 100 });
  const accounts = await models.Account.bulkCreate(values);

  for (let a = 0; a < accounts.length; a++) {
    const account = accounts[a];
    accountBill = await models.AccountBill.create({ accountId: account.id });
  }
  return accounts;
};
