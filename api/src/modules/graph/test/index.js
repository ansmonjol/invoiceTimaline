require('mocha-generators').install();
const moment = require('moment');
const app = require('./../../../config/app');
const models = require('./../../graph/models');
const assert = require('assert');
const request = require('supertest').agent(app.listen());

const seedAccount = require('./seed/account');
const seedUser = require('./seed/user');
const seedCustomer = require('./seed/customer');
const seedProject = require('./seed/project');

const _qwrapper = async (_query) => {
  let query = '';
  let res = '';

  query = `
    {
      login (email: "user0@user.co", password:"user", accountId:"account0")
    }
  `;

  res = await request.post('/api/graph').send({ query }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200);
  assert.equal(res.body.data.login.user.email, 'user0@user.co');
  const email = res.body.data.login.user.email;
  const token = res.body.data.login.token;

  return await request.post('/api/graph').send({ query: _query })
  .set('Accept', 'application/json')
  .set('Authorization', `oauth_token = ${token}, oauth_owner_key = ${email}`)
  .expect('Content-Type', /json/)
  .expect(200);
};

const _qwrapperAccount = async () => {
  let query = '';
  let res = '';

  query = `
    {
      login (email: "user0@user.co", password:"user", accountId:"account0")
    }
  `;

  res = await request.post('/api/graph').send({ query }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200);
  return res.body.data.login;
};


describe('Graph testing', () => {
  // start Add seed
  beforeEach(async function beforeEach() {
    await models.sequelize.sync({ logging: false });
  });

  // start with a fresh DB
  beforeEach(async function beforeEach() {
    this.timeout(30000);
    await models.sequelize.sync({ force: true, logging: false });

    // Add seed resources
    const accounts = await seedAccount(models);
    await seedUser(models, accounts);
    await seedCustomer(models, accounts);
    await seedProject(models, accounts);
    const account = await models.Account.find({ where: { accountId: 'account0' } });
    const user = await models.User.find({ where: { accountId: account.id } });
    const project = await models.Project.find({ where: { accountId: account.id }, include: models.Project.include });
    const category = project.categories[0];

    await _qwrapper(` { addTime(
        accountId: "${account.id}", projectId: "${project.id}", categoryId: "${category.id}", userId: "${user.id}",
        duration: 10, notes: "test", date: "${moment(new Date('2017-04-02')).subtract(3, 'week')}") { id }
    }`);

    await _qwrapper(` { addTime(
        accountId: "${account.id}", projectId: "${project.id}", categoryId: "${category.id}", userId: "${user.id}",
        duration: 5, notes: "test", date: "${moment(new Date('2017-04-02')).subtract(2, 'week')}") { id }
    }`);

    await _qwrapper(` { addTime(
        accountId: "${account.id}", projectId: "${project.id}", categoryId: "${category.id}", userId: "${user.id}",
        duration: 14, notes: "test", date: "${moment(new Date('2017-04-02')).subtract(1, 'week')}") { id }
    }`);

    await _qwrapper(` { addTime(
        accountId: "${account.id}", projectId: "${project.id}", categoryId: "${category.id}", userId: "${user.id}",
        duration: 7, notes: "test", date: "${moment(new Date('2017-04-02'))}") { id }
    }`);
  });

  describe('Graph crud project', () => {
    it('Should get a graph hello', async function it() {
      const query = '{ hello }';
      const req = await request.post('/api/graph')
      .send({ query })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
      assert.equal(req.body.data.hello, 'world');
    });

    it('count', async function it() {
      const query = '{ countTime }';
      const req = await _qwrapper(query);
      assert.equal(req.body.data.countTime, 4);
    });

    it('count', async function it() {
      const query = '{ countTime(status:100) }';
      const req = await _qwrapper(query);
      assert.equal(req.body.data.countTime, 4);
    });

    it('count', async function it() {
      const query = '{ countTime(notes:"notes061591") }';
      const req = await _qwrapper(query);
      assert.equal(req.body.data.countTime, 0);
    });

    describe('sum', () => {
      it('sum', async function it() {
        const query = `{ sumTime(_meta: ${JSON.stringify(JSON.stringify({ field: 'duration' }))}) }`;
        const req = await _qwrapper(query);
        assert.equal(req.body.data.sumTime, 36);
      });

      it('sum', async function it() {
        const query = `{ sumTime(_meta: ${JSON.stringify(JSON.stringify({ field: 'costRate' }))}) }`;
        const req = await _qwrapper(query);
        assert.equal(req.body.data.sumTime, 1800);
      });

      it('sum', async function it() {
        const query = `{ sumTime(_meta: ${JSON.stringify(JSON.stringify({ field: 'billableRate' }))}) }`;
        const req = await _qwrapper(query);
        assert.equal(req.body.data.sumTime, 3600);
      });
    });

    describe('aggregate', () => {
      it('aggregate', async function it() {
        const query = `{ aggregateTime(_meta: ${JSON.stringify(JSON.stringify({ field: 'duration', function: 'count' }))}) }`;
        const req = await _qwrapper(query);
        assert.equal(req.body.data.aggregateTime, 4);
      });

      it('aggregate', async function it() {
        const query = `{ aggregateTime(status:100, _meta: ${JSON.stringify(JSON.stringify({ field: "duration", function: "avg" }))}) }`;
        const req = await _qwrapper(query);
        assert.equal(req.body.data.aggregateTime, 9);
      });
    });

    describe('list', () => {
      it('list', async function it() {
        const query = '{ listTime { id, duration } }';
        const req = await _qwrapper(query);
        assert.equal(req.body.data.listTime.length, 4);
      });

      it('list', async function it() {
        const query = `{ listTime(status:100, _meta: ${JSON.stringify(JSON.stringify({ limit: 400 }))}) { id, duration } }`;
        const req = await _qwrapper(query);
        assert.equal(req.body.data.listTime.length, 4);
        assert.equal(req.body.data.listTime[0].duration, 7);
      });
    });

    describe('one', () => {
      it('one', async function it() {
        const query = '{ oneTime { id, duration } }';
        const req = await _qwrapper(query);
        assert.equal(req.body.data.oneTime.duration, 10);
      });

      it('one', async function it() {
        const query = '{ oneTime(status:100) { id, duration } }';
        const req = await _qwrapper(query);

        const _query = `{ oneTime(id: "${req.body.data.oneTime.id}") { id, duration } }`;
        const _req = await _qwrapper(_query);
        assert.equal(_req.body.data.oneTime.id, req.body.data.oneTime.id);
      });
    });

    describe('update', () => {
      it('update', async function it() {
        const query = '{ oneTime(status:100) { id } }';
        const req = await _qwrapper(query);

        const _query = `{ updateTime(id: "${req.body.data.oneTime.id}", notes: "test2") { id, notes } }`;
        const _req = await _qwrapper(_query);
        assert.equal(_req.body.data.updateTime.notes, 'test2');
      });
    });
  });
});
