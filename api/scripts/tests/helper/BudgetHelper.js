const models = require('./../../models');

class BudgetHelper {
  /**
   * [calculateBudget calculate the total Budget of a channel]
   * @param  {[type]} channel [ CHANNEL OBJECT MUST INCLUDE CHANNEL USERS AND CHANNEL TASKS]
   * @return {[type]}         [description]
   */
  static calculateBudget(channel) {
    let budgetTotal = 0;
    switch (channel.budgetMethod) {
      case 100:
        budgetTotal = Number(channel.budgetValue);
        break;
      case 101:
        for (let i = 0; i < channel.users.length; i++) {
          const channelUserbudget = channel.users[i].budgetValue;
          budgetTotal += Number(channelUserbudget);
        }
        break;
      case 102:
        for (let i = 0; i < channel.categorys.length; i++) {
          const channelCategorybudget = channel.categorys[i].budgetValue;
          budgetTotal += Number(channelCategorybudget);
        }
        break;
      default: break;
    }
    return budgetTotal;
  }

  static calculateCost(channel) {
    let costable = 0;
    if (channel) {
      if (channel.costableMethod === 100) {
        costable = Number(channel.costableValue);
      }
      if (channel.costableMethod === 101) {
        const channelUsers = channel.users;
        for (let i = 0; i < channelUsers.length; i++) {
          costable += Number(channelUsers[i].costableValue);
        }
        costable = (costable / channelUsers.length);
      }
      if (channel.costableMethod === 102) {
        const channelCategorys = channel.categorys;
        for (let i = 0; i < channelCategorys.length; i++) {
          costable += Number(channelCategorys[i].costableValue);
        }
        costable = (costable / channelCategorys.length);
      }
    }
    return costable;
  }

  static *getChannelTimes(channel) {
    const times = yield models.Time.findAll({ where: { channelGuid: channel.guid },
    include: [{ model: models.ChannelUser, as: 'users', where: { isActive: true } },
    { model: models.ChannelCategory, as: 'categorys', where: { isActive: true } }] });
    return times;
  }
  /**
   * [consumedBudget return consumed budget of a channel]
   * @param  {[type]} channel [description]
   * @return {[type]}         [description]
   */
  static *consumedBudget(channel) {
    const queries = {};
    queries.where = { channelGuid: channel.guid };
    queries.include = [
      { model: models.Channel, as: 'channel', include: [{ model: models.ChannelUser, as: 'users', where: { isActive: true } },
      { model: models.ChannelCategory, as: 'categorys', where: { isActive: true } }] }
    ];

    const times = yield models.Time.findAll(queries);
    const consumed = BudgetHelper.getValuesConsumedBudget(times);
    return consumed;
  }
  /**
   * [getValuesConsumedBudget Must include channel]
   * @param  {[type]} times [times must include channel]
   * @return {[type]}       [description]
   */
  static getValuesConsumedBudget(times) {
    let consumedBudget = 0;
    for (let i = 0; i < times.length; i++) {
      const time = times[i];
      let costable = 0; // costable en fonction du time
      if (time.channel) {
        const channel = time.channel;
        // Par budget
        if (channel.costableMethod === 100) {
          costable = Number(channel.costableValue);
        }
        // Par User
        if (channel.costableMethod === 101) {
          const channelUsers = channel.users;
          for (let r = 0; r < channelUsers.length; r++) {
            if (channelUsers[r].userGuid === time.userGuid) {
              costable = Number(channelUsers[r].costableValue);
            }
          }
        }

        if (channel.costableMethod === 102) {
          const channelCategorys = channel.categorys;
          for (let r = 0; r < channelCategorys.length; r++) {
            if (channelCategorys[r].categoryGuid === time.categoryGuid) {
              costable = Number(channelCategorys[r].costableValue);
            }
          }
        }
        consumedBudget += (Number((time.duration * costable).toFixed(0)));
      }
    }
    return consumedBudget;
  }
  /**
   * [costed description]
   * @param  {[type]} channel [description]
   * @return {[type]}         [description]
   */
  static *costed(channel) {
    const times = yield models.Time.findAll({ where: { channelGuid: channel.guid }, include: models.Time.include });
    let costedValue = 0;
    let durationTotal = 0;

    for (let i = 0; i < times.length; i++) {
      const time = times[i];
      costedValue += (Number((time.duration * time.user.costRate).toFixed(0)));
      durationTotal += time.duration;
    }
    return Promise.resolve({ costedValue, durationTotal });
  }

}

module.exports = BudgetHelper;
