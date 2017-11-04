const faker = require('faker/locale/fr');

module.exports = async function projectSeed(models, accounts) {
  for (let a = 0; a < accounts.length; a++) {
    const account = accounts[a];
    const customers = await models.Customer.findAll({ accountId: account.id });
    const usersRecords = await models.User.findAll({ accountId: account.id });
    const users = [];
    const tags = [];
    for (let u = 0; u < usersRecords.length; u++) {
      users.push({ userId: usersRecords[u].id });
      tags.push(`tag${a}${u}`);
    }
    // Budget tablue
    for (let c = 0; c < customers.length; c++) {
      const customer = customers[c];
      const categories = [];
      const items = [];
      for (let ca = 0; ca < 2; ca++) {
        items.push({ name: `item${ca}`, state: 101 });
      }

      for (let ca = 0; ca < 1; ca++) {
        items.push({ name: `item${ca}`, state: 100 });
      }

      for (let ca = 0; ca < 1; ca++) {
        items.push({ name: `item${ca}`, state: 100, status: 101 });
      }

      for (let ca = 0; ca < 2; ca++) {
        categories.push({ name: faker.lorem.words(), budgetValue: 20000, status: 100, alertValue: ca / 10, tasks: items });
      }

      // Matrix NBNF
      for (let p = 0; p < 1; p++) {
        await models.Project.create({
          name: faker.lorem.words(),
          accountId: account.id,
          code: `project${a}${c}${p}`,
          notes: faker.lorem.paragraph(),
          users,
          budgetable: true,
          budgetMethod: 101,
          billable: true,
          tags,
          categories,
          customerId: customer.id
        }, { include: models.Project.include || [] });
      }

      for (let p = 0; p < 1; p++) {
        await models.Project.create({
          name: faker.lorem.words(),
          accountId: account.id,
          code: `project${a}${c}${p}`,
          notes: faker.lorem.paragraph(),
          // users,
          budgetable: true,
          budgetValue: 8000,
          budgetMethod: 100,
          billable: true,
          tags,
          categories,
          customerId: customer.id
        }, { include: models.Project.include || [] });
      }
    }
  }

  return [];
};
