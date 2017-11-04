
require('mocha-generators').install();
const models = require('./../../models');
const app = require('./../../../config/app');
const assert = require('assert');
const seedUser = require('./seed/user');
const seedCategory = require('./seed/category');
const seedCustomer = require('./seed/customer');
const seedChannel = require('./seed/channel');
const seedTime = require('./seed/time');
const request = require('supertest').agent(app.listen());

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

  describe('GET /times', () => {
    it('should get a list of resources', function *() {
      assert.equal(yield models.User.count(), 3);
      assert.equal(yield models.Category.count(), 3);
      assert.equal(yield models.Customer.count(), 5);
      assert.equal(yield models.Channel.count(), 5);
    });

    it('should get a list of times', function *() {
      yield request.post('/api/users/find').expect(201);
    });
  });
});
