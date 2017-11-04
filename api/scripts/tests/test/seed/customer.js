
module.exports = function *(models) {
  const records = yield models.Customer.bulkCreate([
    { name: 'customer1' },
    { name: 'customer2' },
    { name: 'customer3' },
    { name: 'customer4' },
    { name: 'customer5' }
  ]);
  return Promise.resolve(records);
};
