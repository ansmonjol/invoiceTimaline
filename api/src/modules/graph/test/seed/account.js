const faker = require('faker/locale/fr');
module.exports = async function accountSeed(models) {
  const values = [];
  for (let i = 0; i < 1; i++) values.push({ mail: faker.internet.email(), billingEmail: faker.internet.email(), name: faker.company.companyName(), accountId: `account${i}`, billableRate: 100 });
  return await models.Account.bulkCreate(values);
};
