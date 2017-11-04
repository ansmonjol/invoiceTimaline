const faker = require('faker/locale/fr');

module.exports = async function userSeed(models, accounts) {
  const values = [];
  for (let a = 0; a < accounts.length; a++) {
    const account = accounts[a];
    const records = await models.Organization.findAll({ accountId: account.id });
    const organizations = [];
    for (let r = 0; r < records.length; r++) {
      const record = records[r];
      organizations.push({ organizationId: record.id });
    }

    models.User.create({
      lastName: faker.name.lastName(),
      firstName: faker.name.firstName(),
      email: 'user0@user.co',
      accountId: account.id,
      password: '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb',
      billableRate: 100,
      costRate: 30,
      role: 102,
      acceptedAt: new Date(),
      accepted: true,
      mustChangePassword: false,
      organizations
    }, { include: models.User.include });

    for (let i = 0; i < 10; i++) {
      models.User.create({
        email: faker.internet.email(),
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        accountId: account.id,
        password: '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb',
        billableRate: 100,
        costRate: 30,
        accepted: false,
        organizations
      }, { include: models.User.include });

      models.User.create({
        email: faker.internet.email(),
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        accountId: account.id,
        password: '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb',
        billableRate: 100,
        costRate: 30,
        acceptedAt: new Date(),
        accepted: true,
        organizations
      }, { include: models.User.include });
    }
  }

  return await models.User.bulkCreate(values);
};
