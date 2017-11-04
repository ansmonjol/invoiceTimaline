const faker = require('faker/locale/fr');
module.exports = async function accountSeed(models) {
  const values = [];
  const email = faker.internet.email()
  const accounts = await models.Account.create({
    email,
    billingEmail: email,
    name: 'eFounders',
  });
  return accounts;
};
