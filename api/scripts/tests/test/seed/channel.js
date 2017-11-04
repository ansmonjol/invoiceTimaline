
module.exports = function *(models, customers, users, categorys) {
  const records = [];
  records[0] = yield models.Channel.create({
    name: 'channel1',
    code: 'channel1',
    notes: 'channel1',
    users: [{ user: users[0] }, { user: users[1] }, { user: users[2] }],
    categorys: [{ category: categorys[0] }, { category: categorys[1] }, { category: categorys[2] }],
    customerGuid: customers[0].guid
  }, { include: models.Channel.include || [] });

  // Budget: channel, cost: user
  records[1] = yield models.Channel.create({
    name: 'channel2',
    code: 'channel2',
    start: new Date(),
    end: new Date(),
    notes: 'channel2',
    budgetable: true,
    budgetMethod: 100,
    costable: true,
    budgetValue: 20000,
    costableMethod: 101,
    alertable: true,
    alertMethod: 100,
    alertValue: 70,
    users: [{ costableValue: 100, user: users[0] }, { costableValue: 85, user: users[1] }, { costableValue: 50, user: users[2] }],
    categorys: [{ category: categorys[0] }, { category: categorys[1] }, { category: categorys[2] }],
    customerGuid: customers[1].guid
  }, { include: models.Channel.include || [] });

  // Budget: channel, cost: category
  records[2] = yield models.Channel.create({
    name: 'channel3',
    code: 'channel3',
    start: new Date(),
    end: new Date(),
    notes: 'channel3',
    budgetable: true,
    budgetMethod: 100,
    costable: true,
    budgetValue: 50000,
    costableMethod: 102,
    alertable: true,
    alertMethod: 100,
    alertValue: 70,
    users: [{ user: users[0] }, { user: users[1] }, { user: users[2] }],
    categorys: [{ costableValue: 100, category: categorys[0] }, { costableValue: 85, category: categorys[1] }, { costableValue: 50, category: categorys[2] }],
    customerGuid: customers[2].guid
  }, { include: models.Channel.include || [] });

  // Budget: user, cost: category
  records[3] = yield models.Channel.create({
    name: 'channel4',
    code: 'channel4',
    start: new Date(),
    end: new Date(),
    notes: 'channel4',
    budgetable: true,
    budgetMethod: 101,
    costable: true,
    costableMethod: 102,
    alertable: true,
    alertMethod: 100,
    alertValue: 70,
    users: [{ costableValue: 100, user: users[0] }, { costableValue: 85, user: users[1] }, { costableValue: 50, user: users[2] }],
    categorys: [{ budgetValue: 20000, category: categorys[0] }, { budgetValue: 9000, category: categorys[1] }, { budgetValue: 5000, category: categorys[2] }],
    customerGuid: customers[3].guid
  }, { include: models.Channel.include || [] });

  // Budget: category, cost: user
  records[4] = yield models.Channel.create({
    name: 'channel5',
    code: 'channel5',
    start: new Date(),
    end: new Date(),
    notes: 'channel5',
    budgetable: true,
    budgetMethod: 101,
    costable: true,
    costableMethod: 102,
    alertable: true,
    alertMethod: 100,
    alertValue: 70,
    users: [{ costableValue: 100, user: users[0] }, { costableValue: 85, user: users[1] }, { costableValue: 50, user: users[2] }],
    categorys: [{ budgetValue: 20000, category: categorys[0] }, { budgetValue: 9000, category: categorys[1] }, { budgetValue: 5000, category: categorys[2] }],
    customerGuid: customers[4].guid
  }, { include: models.Channel.include || [] });

  return Promise.resolve(records);
};
