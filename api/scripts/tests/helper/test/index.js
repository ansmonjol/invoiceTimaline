
require('mocha-generators').install();
const models = require('./../../../models');
const app = require('./../../../../config/app');
const assert = require('assert');
const seedUser = require('./seed/user');
const seedCategory = require('./seed/category');
const seedCustomer = require('./seed/customer');
const seedChannel = require('./seed/channel');
const seedTime = require('./seed/time');
const request = require('supertest').agent(app.listen());
const BudgetHelper = require('./../BudgetHelper');
describe('Time testing', () => {
  // start with a fresh DB
  beforeEach(function *() {
    yield models.sequelize.sync({ force: true, logging: false });

    // Add seed resources
    const users = yield seedUser(models);
    const categorys = yield seedCategory(models);
    const customers = yield seedCustomer(models);
    const channels = yield seedChannel(models, customers, users, categorys);
    yield seedTime(models, channels, users, categorys);
  });

  // describe('GET /times', () => {
  //   it('should get a list of resources', function *() {
  //     assert.equal(yield models.User.count(), 3);
  //     assert.equal(yield models.Category.count(), 3);
  //     assert.equal(yield models.Customer.count(), 5);
  //     assert.equal(yield models.Channel.count(), 5);
  //   });
  //
  //   it('should get a list of times', function *() {
  //     yield request.post('/api/users/find').expect(201);
  //   });
  // });

  describe('GET /calculate Budgets', () => {
    it('should calculate budget of channel', function *() {
      const channels = yield models.Channel.findAll({ include: [
        { model: models.ChannelUser, as: 'users' },
        { model: models.ChannelCategory, as: 'categorys' },
        { model: models.Customer, as: 'customer' }
      ] });
      assert.equal(BudgetHelper.calculateBudget(channels[1]), 20000);
      assert.equal(BudgetHelper.calculateBudget(channels[2]), 360);
      assert.equal(BudgetHelper.calculateBudget(channels[2]), 360);
    });
    it('should return consumed budget of array of a timesheets', function *() {
      const channels = yield models.Channel.findAll();
      const times1 = yield models.Time.findAll({ where: { channelGuid: channels[1].guid }, include: [
        { model: models.Channel, include: [
          { model: models.ChannelUser, as: 'users' },
          { model: models.ChannelCategory, as: 'categorys' },
          { model: models.Customer, as: 'customer' }
        ], as: 'channel' },
      ] });
      assert.equal(BudgetHelper.getValuesConsumedBudget(times1, 52.5));
      const times2 = yield models.Time.findAll({ where: { channelGuid: channels[2].guid }, include: [
        { model: models.Channel, include: [
          { model: models.ChannelUser, as: 'users' },
          { model: models.ChannelCategory, as: 'categorys' },
          { model: models.Customer, as: 'customer' }
        ], as: 'channel' },
      ] });
      assert.equal(BudgetHelper.getValuesConsumedBudget(times2, 180));

      const times3 = yield models.Time.findAll({ where: { channelGuid: channels[3].guid }, include: [
        { model: models.Channel, include: [
          { model: models.ChannelUser, as: 'users' },
          { model: models.ChannelCategory, as: 'categorys' },
          { model: models.Customer, as: 'customer' }
        ], as: 'channel' },
      ] });
      assert.equal(BudgetHelper.getValuesConsumedBudget(times3, 180));

      // assert.equal(BudgetHelper.getValuesConsumedBudget(times1, 52.5));
      // getValuesConsumedBudget
      // assert.equal(BudgetHelper.calculateBudget(channels[1]), 20000);
      // assert.equal(BudgetHelper.calculateBudget(channels[2]), 360);
      // assert.equal(BudgetHelper.calculateBudget(channels[2]), 360);
    });
  });
});
