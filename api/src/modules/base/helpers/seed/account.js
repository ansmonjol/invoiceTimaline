const faker = require('faker/locale/fr');
module.exports = async function accountSeed(models) {
  const values = [];
  const email = faker.internet.email();

  for (let i = 0; i < 1; i++) values.push({
    email,
    billingEmail: email,
    name: 'eFounders',
  });
  const accounts = await models.Account.bulkCreate(values);

  return accounts;
};
