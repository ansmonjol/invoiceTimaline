const faker = require('faker/locale/fr');
const models = require('./../../../graph/models');

module.exports = async function customerSeed(models, accounts) {
  console.log('accounts', accounts);
  const values = [];
  for (let a = 0; a < accounts.length; a++) {
    const account = accounts[a];

    const customers = JSON.parse(JSON.stringify(await models.Customer.findAll({ where: { accountId: account.id } })))
    console.log('customers', customers);
    for (let c = 0; c < customers.length; c++) {
      const customer = customers[c];

      // Create customer account invoices
      for (let i = 1; i <= 20; i++) {
        values.push(
          {
            ref: `${i}`,
            // issuedAt: ,
            // dueDate: ,
            amount: Number(faker.finance.amount()),
            status: faker.random.arrayElement([103, 102, 101, 100]),
            accountId: account.id,
            customerId: customer.id,
          }
        );
      }
    }
  }

  console.log('values', values);
  return await models.Invoice.bulkCreate(values);
};
