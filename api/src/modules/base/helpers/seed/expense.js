const moment = require('moment');
const faker = require('faker/locale/fr');

module.exports = async function expenseSeed(models, accounts) {
  const values = [];
  for (let a = 0; a < accounts.length; a++) {
    const account = accounts[a];
    const users = await models.User.findAll({ accountId: account.id });
    const projects = await models.Project.findAll({ accountId: account.id });
    const tags = [];
    // Fill tags array
    for (let p = 0; p < projects.length; p++) {
      tags.push(`tag${a}${p}`);
    }


    // Projects expenses
    for (let p = 0; p < projects.length; p++) {
      for (let u = 0; u < users.length; u++) {
        const project = projects[p];
        const user = users[u];
        const amount = Math.floor(Math.random() * 1000) + 1;

        values.push({
          amount,
          tags,
          accountId: account.id,
          projectId: project.id,
          userId: user.id,
          date: moment().subtract(Math.floor(Math.random() * 31) + 0, 'days'),
          notes: faker.lorem.paragraph(),
          // 100: Enabled
          // 99: Archived
          status: p === 0 ? 99 : 100,
        });

        // Users expenses
        values.push({
          amount,
          tags,
          accountId: account.id,
          projectId: project.id,
          userId: user.id,
          date: moment().subtract(Math.floor(Math.random() * 31) + 0, 'days'),
          notes: faker.lorem.paragraph(),
          // 100: Enabled
          // 99: Archived
          status: u === 0 ? 99 : 100,
        });
      }
    }
  }
  const records = await models.Expense.bulkCreate(values);
  return records;
};
