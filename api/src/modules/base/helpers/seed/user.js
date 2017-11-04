const faker = require('faker/locale/fr');

module.exports = async function userSeed(models, accounts) {
  const values = [];
  for (let a = 0; a < accounts.length; a++) {
    const account = accounts[a];
    values.push({
      lastName: 'Giraux',
      firstName: 'Bertrand',
      email: 'user0@user.co',
      password: '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb',
      role: 102,
      accountId: account.id,
    });

    for (let i = 1; i <= 5; i++) {
      values.push({
        email: `user${i}@user.co`,
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        accountId: account.id,
        password: '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb',
        accountId: account.id,
      });
    }
  }

  return await models.User.bulkCreate(values);
};