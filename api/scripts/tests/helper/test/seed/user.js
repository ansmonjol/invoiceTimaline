
module.exports = function *(models) {
  const records = yield models.User.bulkCreate([
    {
      firstName: 'user1',
      lastName: 'user1',
      password: 'user1',
      isAdmin: true,
      email: 'user1@user.co',
      billableRate: 200,
      costRate: 100,
    },
    {
      firstName: 'user2',
      lastName: 'user2',
      password: 'user2',
      isAdmin: false,
      email: 'user2@user.co',
      billableRate: 250,
      costRate: 100,
    },
    {
      firstName: 'user3',
      lastName: 'user3',
      password: 'user3',
      isAdmin: false,
      email: 'user3@user.co',
      billableRate: 400,
      costRate: 150,
    }
  ]);
  return Promise.resolve(records);
};
