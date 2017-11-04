const faker = require('faker/locale/fr');

module.exports = async function organizationSeed(models, accounts) {
  const values = [];
  for (let a = 0; a < accounts.length; a++) {
    const account = accounts[a];
    for (let i = 0; i < 5; i++) values.push({ name: faker.company.companyName(), accountId: account.id });
  }
  return await models.Organization.bulkCreate(values);
};
