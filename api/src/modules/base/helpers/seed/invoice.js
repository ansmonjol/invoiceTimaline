const faker = require('faker/locale/fr');
const models = require('./../../../graph/models');

module.exports = async function customerSeed(models, accounts) {
  const values = [];
  for (let a = 0; a < accounts.length; a++) {
    const account = accounts[a];

    const customers = JSON.parse(JSON.stringify(await models.Customer.findAll({ where: { accountId: account.id } })))

    values.push(
      {
        ref: '1',
        issuedAt: faker.date.past(),
        dueDate: faker.date.future(),
        amount: Number(faker.finance.amount()),
        status: 100,
        accountId: account.id,
        customerId: (faker.random.arrayElement(customers)).id,
      }
    );

    values.push(
      {
        ref: '2',
        issuedAt: faker.date.past(),
        dueDate: faker.date.past(),
        amount: Number(faker.finance.amount()),
        status: 101,
        paymentDate: faker.date.past(),
        paymentMethod: 'WireTransfer',
        accountId: account.id,
        customerId: (faker.random.arrayElement(customers)).id,
      }
    );

    values.push(
      {
        ref: '3',
        dueDate: faker.date.past(),
        dueDate: faker.date.past(),
        amount: Number(faker.finance.amount()),
        status: 102,
        accountId: account.id,
        customerId: (faker.random.arrayElement(customers)).id,
      }
    );

    values.push(
      {
        ref: '4',
        issuedAt: faker.date.past(),
        dueDate: faker.date.past(),
        amount: Number(faker.finance.amount()),
        status: 102,
        accountId: account.id,
        customerId: (faker.random.arrayElement(customers)).id,
      }
    );

    for (let i = 5; i <= 20; i++) {
      values.push(
        {
          ref: `${i}`,
          issuedAt: faker.date.recent(),
          dueDate: faker.date.recent(),
          amount: Number(faker.finance.amount()),
          status: faker.random.arrayElement([103, 102, 100]),
          accountId: account.id,
          customerId: (faker.random.arrayElement(customers)).id,
        }
      );
    }
  }
  return await models.Invoice.bulkCreate(values);
};
