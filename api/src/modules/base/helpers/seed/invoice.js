const faker = require('faker/locale/fr');
const models = require('./../../../graph/models');

module.exports = async function customerSeed(models, accounts) {
  const values = [];
  for (let a = 0; a < accounts.length; a++) {
    const account = accounts[a];

    const customers = JSON.parse(JSON.stringify(await models.Customer.findAll({ where: { accountId: account.id } })))
    for (let c = 0; c < customers.length; c++) {
      const customer = customers[c];
      // Create customer account invoices
      values.push(
        {
          ref: '1',
          issuedAt: faker.date.past(),
          dueDate: faker.date.future(),
          amount: Number(faker.finance.amount()),
          status: 100,
          accountId: account.id,
          customerId: customer.id,
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
          accountId: account.id,
          customerId: customer.id,
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
          customerId: customer.id,
        }
      );

      values.push(
        {
          ref: '3',
          issuedAt: faker.date.past(),
          dueDate: faker.date.past(),
          amount: Number(faker.finance.amount()),
          status: 102,
          accountId: account.id,
          customerId: customer.id,
        }
      );

      for (let i = 4; i <= 20; i++) {
        values.push(
          {
            ref: `${i}`,
            issuedAt: faker.date.recent(),
            dueDate: faker.date.recent(),
            amount: Number(faker.finance.amount()),
            status: faker.random.arrayElement([103, 102, 101, 100]),
            accountId: account.id,
            customerId: customer.id,
          }
        );
      }
    }
  }

  return await models.Invoice.bulkCreate(values);
};
