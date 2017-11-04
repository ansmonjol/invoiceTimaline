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
      for (let ca = 0; ca < 5; ca++) {
        items.push({ name: `item${ca}`, state: 101 });
      }

      for (let ca = 0; ca < 2; ca++) {
        items.push({ name: `item${ca}`, state: 100 });
      }

      for (let ca = 0; ca < 1; ca++) {
        items.push({ name: `item${ca}`, state: 100, status: 101 });
      }

      for (let ca = 0; ca < 2; ca++) {
        categories.push({ name: faker.lorem.words(), budgetValue: 20000, status: 100, alertValue: ca / 10, tasks: items });
      }

      // for (let ca = 0; ca < 1; ca++) {
      //   categories.push({ name: `category${a}${c}${ca}`, budgetValue: 1000000, status: 101, alertValue: ca / 10, tasks: items });
      // }
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
        // await addAvancement(models, record);
      }

      // Matrix NBF
      for (let p = 0; p < 1; p++) {
        await models.Project.create({
          name: `project${a}${c}${p}`,
          code: `project${a}${c}${p}`,
          notes: `project${a}${c}${p}`,
          accountId: account.id,
          users,
          budgetable: false,
          billable: true,
          tags,
          categories,
          customerId: customer.id
        }, { include: models.Project.include || [] });
        // await addAvancement(models, record);
      }

      // Matrix BNF Budget To Project
      for (let p = 0; p < 2; p++) {
        await models.Project.create({
          name: `project${a}${c}${p}`,
          code: `project${a}${c}${p}`,
          notes: `project${a}${c}${p}`,
          accountId: account.id,
          users,
          budgetable: true,
          budgetMethod: p === 0 ? 100 : 101,
          budgetValue: 100000,
          billable: false,
          tags,
          categories,
          customerId: customer.id
        }, { include: models.Project.include || [] });
        // await addAvancement(models, record);
      }

      // Matrix BF Budget To Project
      for (let p = 0; p < 2; p++) {
        await models.Project.create({
          name: faker.lorem.words(),
          code: `project${a}${c}${p}`,
          notes: faker.lorem.paragraph(),
          accountId: account.id,
          users,
          budgetable: true,
          budgetMethod: p === 0 ? 100 : 101,
          budgetValue: 100000,
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
