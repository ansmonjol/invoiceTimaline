
module.exports = function *(models, channels, users, categorys) {
  const records = yield models.Time.bulkCreate([
    {
      date: new Date(), duration: 7,
      categoryGuid: categorys[1].guid, channelGuid: channels[1].guid, userGuid: users[0].guid
    },
    {
      date: new Date(), duration: 3.5,
      categoryGuid: categorys[1].guid, channelGuid: channels[1].guid, userGuid: users[1].guid
    },
    {
      date: new Date(), duration: 7,
      categoryGuid: categorys[2].guid, channelGuid: channels[2].guid, userGuid: users[0].guid
    },
    {
      date: new Date(), duration: 3,
      categoryGuid: categorys[2].guid, channelGuid: channels[2].guid, userGuid: users[0].guid
    },
    {
      date: new Date(), duration: 7,
      categoryGuid: categorys[2].guid, channelGuid: channels[2].guid, userGuid: users[1].guid
    },
    {
      date: new Date(), duration: 3,
      categoryGuid: categorys[2].guid, channelGuid: channels[2].guid, userGuid: users[1].guid
    },
    {
      date: new Date(), duration: 7,
      categoryGuid: categorys[2].guid, channelGuid: channels[2].guid, userGuid: users[2].guid
    },
    {
      date: new Date(), duration: 3,
      categoryGuid: categorys[2].guid, channelGuid: channels[2].guid, userGuid: users[2].guid
    },
    {
      date: new Date(), duration: 1,
      categoryGuid: categorys[0].guid, channelGuid: channels[4].guid, userGuid: users[1].guid
    },
    {
      date: new Date(), duration: 5,
      categoryGuid: categorys[1].guid, channelGuid: channels[2].guid, userGuid: users[2].guid
    },
    {
      date: new Date(), duration: 9,
      categoryGuid: categorys[2].guid, channelGuid: channels[4].guid, userGuid: users[0].guid
    },
    {
      date: new Date(), duration: 2,
      categoryGuid: categorys[1].guid, channelGuid: channels[3].guid, userGuid: users[0].guid
    },
    {
      date: new Date(), duration: 8,
      categoryGuid: categorys[2].guid, channelGuid: channels[2].guid, userGuid: users[1].guid
    },
    {
      date: new Date(), duration: 4,
      categoryGuid: categorys[1].guid, channelGuid: channels[0].guid, userGuid: users[2].guid
    },
  ]);
  return Promise.resolve(records);
};
