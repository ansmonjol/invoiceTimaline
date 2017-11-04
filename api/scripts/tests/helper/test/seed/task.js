
module.exports = function *(models) {
  const records = yield models.Category.bulkCreate([
    { name: 'category1' },
    { name: 'category2' },
    { name: 'category3' }
  ]);
  return Promise.resolve(records);
};
