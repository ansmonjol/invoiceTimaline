// require('mocha-generators').install();
// const app = require('./../../../config/app');
// const models = require('./../../graph/models');
// const assert = require('assert');
// const request = require('supertest').agent(app.listen());
// const moment = require('moment');
// const seedAccount = require('./seed/account');
// const seedUser = require('./seed/user');
// const seedCustomer = require('./seed/customer');
// const seedProject = require('./seed/project');
//
// const _qwrapper = async (_query) => {
//   let query = '';
//   let res = '';
//
//   query = `
//     {
//       login (email: "user0@user.co", password:"user", accountId:"account0")
//     }
//   `;
//
//   res = await request.post('/api/graph').send({ query }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200);
//   assert.equal(res.body.data.login.user.email, 'user0@user.co');
//   const email = res.body.data.login.user.email;
//   const token = res.body.data.login.token;
//
//   return await request.post('/api/graph').send({ query: _query })
//   .set('Accept', 'application/json')
//   .set('Authorization', `oauth_token = ${token}, oauth_owner_key = ${email}`)
//   .expect('Content-Type', /json/)
//   .expect(200);
// };
//
//
// describe('Account testing', () => {
//   // start Add seed
//   beforeEach(async function beforeEach() {
//     await models.sequelize.sync({ logging: false });
//   });
//
//   // start with a fresh DB
//   beforeEach(async function beforeEach() {
//     this.timeout(30000);
//     await models.sequelize.sync({ force: true, logging: false });
//
//     // Add seed resources
//     const accounts = await seedAccount(models);
//     await seedUser(models, accounts);
//     await seedCustomer(models, accounts);
//     await seedProject(models, accounts);
//     const account = await models.Account.find({ where: { accountId: 'account0' } });
//     const user = await models.User.find({ where: { accountId: account.id } });
//     const project = await models.Project.find({ where: { accountId: account.id }, include: models.Project.include });
//     const category = project.categories[0];
//
//     await _qwrapper(` { addTime(
//         accountId: "${account.id}", projectId: "${project.id}", categoryId: "${category.id}", userId: "${user.id}",
//         duration: 10, notes: "test", date: "${moment(new Date('2017-04-02')).subtract(3, 'week')}") { id }
//     }`);
//
//     await _qwrapper(` { addTime(
//         accountId: "${account.id}", projectId: "${project.id}", categoryId: "${category.id}", userId: "${user.id}",
//         duration: 5, notes: "test", date: "${moment(new Date('2017-04-02')).subtract(2, 'week')}") { id }
//     }`);
//
//     await _qwrapper(` { addTime(
//         accountId: "${account.id}", projectId: "${project.id}", categoryId: "${category.id}", userId: "${user.id}",
//         duration: 14, notes: "test", date: "${moment(new Date('2017-04-02')).subtract(1, 'week')}") { id }
//     }`);
//
//     await _qwrapper(` { addTime(
//         accountId: "${account.id}", projectId: "${project.id}", categoryId: "${category.id}", userId: "${user.id}",
//         duration: 7, notes: "test", date: "${moment(new Date('2017-04-02'))}") { id }
//     }`);
//   });
//
//   describe('Graph account', () => {
//     it('account', async function it() {
//       let query;
//       let res;
//
//       query = `
//         {
//           haveAccount(accountId: "account0")
//         }
//       `;
//       res = await _qwrapper(query);
//       assert.equal(res.body.data.haveAccount, true);
//
//       query = `
//         {
//           haveAccount(accountId: "aceeecount0")
//         }
//       `;
//       res = await _qwrapper(query);
//       assert.equal(res.body.data.haveAccount, false);
//
//       query = `
//         {
//           login (email: "user0@user.co", password:"user", accountId:"account0")
//         }
//       `;
//
//       res = await _qwrapper(query);
//       assert.equal(res.body.data.login.user.email, 'user0@user.co');
//       const token = res.body.data.login.token;
//       const accountId = res.body.data.login.account.id;
//       query = `
//         {
//           logout(token: "${token}")
//         }
//       `;
//       res = await _qwrapper(query);
//       assert.equal(res.body.data.logout, false);
//
//
//       query = `
//         {
//           updatePassword(email: "user0@user.co", password: "user", accountId:"${accountId}")
//         }
//       `;
//       res = await _qwrapper(query);
//       assert.equal(res.body.data.updatePassword, true);
//     });
//   });
// });
//
// describe('Customer testing', () => {
//   // start Add seed
//   beforeEach(async function beforeEach() {
//     await models.sequelize.sync({ logging: false });
//   });
//
//   // start with a fresh DB
//   beforeEach(async function beforeEach() {
//     this.timeout(30000);
//     await models.sequelize.sync({ force: true, logging: false });
//
//     // Add seed resources
//     const accounts = await seedAccount(models);
//     await seedUser(models, accounts);
//     await seedCustomer(models, accounts);
//     await seedProject(models, accounts);
//     const account = await models.Account.find({ where: { accountId: 'account0' } });
//     const user = await models.User.find({ where: { accountId: account.id } });
//     const project = await models.Project.find({ where: { accountId: account.id }, include: models.Project.include });
//     const category = project.categories[0];
//
//     await _qwrapper(` { addTime(
//         accountId: "${account.id}", projectId: "${project.id}", categoryId: "${category.id}", userId: "${user.id}",
//         duration: 10, notes: "test", date: "${moment(new Date('2017-04-02')).subtract(3, 'week')}") { id }
//     }`);
//
//     await _qwrapper(` { addTime(
//         accountId: "${account.id}", projectId: "${project.id}", categoryId: "${category.id}", userId: "${user.id}",
//         duration: 5, notes: "test", date: "${moment(new Date('2017-04-02')).subtract(2, 'week')}") { id }
//     }`);
//
//     await _qwrapper(` { addTime(
//         accountId: "${account.id}", projectId: "${project.id}", categoryId: "${category.id}", userId: "${user.id}",
//         duration: 14, notes: "test", date: "${moment(new Date('2017-04-02')).subtract(1, 'week')}") { id }
//     }`);
//
//     await _qwrapper(` { addTime(
//         accountId: "${account.id}", projectId: "${project.id}", categoryId: "${category.id}", userId: "${user.id}",
//         duration: 7, notes: "test", date: "${moment(new Date('2017-04-02'))}") { id }
//     }`);
//   });
//
//   describe('Graph customers', () => {
//     it('countCustomerDetailed', async function it() {
//       let query;
//       let res;
//
//       query = `
//         {
//           countCustomerDetailed
//         }
//       `;
//
//       res = await _qwrapper(query);
//       assert.equal(res.body.data.countCustomerDetailed, 1);
//
//       query = `
//         {
//           countCustomerDetailed(billable:true)
//         }
//       `;
//       res = await _qwrapper(query);
//       assert.equal(res.body.data.countCustomerDetailed, 1);
//
//       query = `
//         {
//           countCustomerDetailed(billable:false)
//         }
//       `;
//       res = await _qwrapper(query);
//       assert.equal(res.body.data.countCustomerDetailed, 0);
//
//       query = `
//         {
//           countCustomerDetailed(text:"customer0")
//         }
//       `;
//       res = await _qwrapper(query);
//       assert.equal(res.body.data.countCustomerDetailed, 0);
//
//       query = `
//         {
//           countCustomerDetailed(text:"Customer00", billable:true)
//         }
//       `;
//       res = await _qwrapper(query);
//       assert.equal(res.body.data.countCustomerDetailed, 0);
//     });
//
//     it('listCustomerDetailed', async function it() {
//       this.timeout(30000);
//       const query = `
//         {
//           listCustomerDetailed {
//             customer { id name }
//             totalProject
//             revenues
//             revenuesMarge
//             budgetProjectsOpenned
//             consumedBudgetProjectsOpenned
//             cost
//           }
//         }
//       `;
//       const res = await _qwrapper(query);
//       assert.equal(res.body.data.listCustomerDetailed.length, 1);
//       assert.equal(res.body.data.listCustomerDetailed[0].budgetProjectsOpenned, 48000);
//       assert.equal(res.body.data.listCustomerDetailed[0].consumedBudgetProjectsOpenned, 3600);
//     });
//
//     it('revenuesBillableCustomer', async function it() {
//       this.timeout(30000);
//       const query = `
//         {
//           revenuesBillableCustomer
//           countCustomerWithProjectOpened
//         }
//       `;
//       const res = await _qwrapper(query);
//       assert.equal(res.body.data.revenuesBillableCustomer, 0);
//       assert.equal(res.body.data.countCustomerWithProjectOpened, 1);
//     });
//   });
// });
