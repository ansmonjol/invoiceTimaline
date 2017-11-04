const faker = require('faker/locale/fr');

module.exports = async function userSeed(models, accounts) {
  const values = [];
  for (let a = 0; a < accounts.length; a++) {
    const account = accounts[a];
    models.User.create({
      lastName: faker.name.lastName(),
      firstName: faker.name.firstName(),
      email: 'user0@user.co',
      accountId: account.id,
      password: '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb',
      costRate: 50,
      role: 102,
      mustChangePassword: false,
    }, { include: models.User.include });

    for (let i = 0; i < 2; i++) {
      models.User.create({
        email: faker.internet.email(),
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        accountId: account.id,
        password: '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb',
        costRate: 50,
      }, { include: models.User.include });
    }
  }

  return await models.User.bulkCreate(values);
};
