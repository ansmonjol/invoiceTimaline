const moment = require('moment');
const faker = require('faker/locale/fr');

module.exports = async function timeSeed(models, accounts) {
  const values = [];
  for (let a = 0; a < accounts.length; a++) {
    const account = accounts[a];
    const users = await models.User.findAll({ accountId: account.id });
    const projects = await models.Project.findAll({ accountId: account.id });
    for (let c = 0; c < projects.length; c++) {
      const project = projects[c];
      const categories = await models.ProjectCategory.findAll({ accountId: account.id, projectId: project.id });
      for (let u = 0; u < users.length; u++) {
        const user = users[u];
        for (let ca = 0; ca < categories.length; ca++) {
          const category = categories[ca];
          const duration = Math.floor(Math.random() * 7) + 1;
          for (let d = 0; d < 2; d++) {
            values.push({
              accountId: account.id,
              projectId: project.id,
              categoryId: category.id,
              userId: user.id,
              date: moment().subtract(Math.floor(Math.random() * 31) + 0, 'days'),
              // costRate: user.costRate * duration,
              // billableRate: user.billableRate * duration,
              notes: faker.lorem.paragraph(),
              duration
            });
          }
          for (let d = 0; d < 1; d++) {
            values.push({
              accountId: account.id,
              projectId: project.id,
              categoryId: category.id,
              userId: user.id,
              date: moment().subtract(Math.floor(Math.random() * 31) + 0, 'days'),
              costRate: user.costRate * duration,
              billableRate: user.billableRate * duration,
              notes: faker.lorem.paragraph(),
              duration,
              status: 99
            });
          }
        }
      }
    }
  }
  const records = await models.Time.bulkCreate(values);
  return records;
};
