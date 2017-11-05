const faker = require('faker/locale/fr');
module.exports = async function accountSeed(models) {
  const values = [];
  const email = faker.internet.email();

  values.push({
    email,
    billingEmail: email,
    name: 'eFounders',
  });

  for (let i = 0; i < 2; i++) values.push({
    email,
    billingEmail: email,
    name: faker.company.companyName(),
  });
  const accounts = await models.Account.bulkCreate(values);

  return accounts;
};
