'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChannelTask = sequelize.define('ChannelTask', {
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: { isUUID: 4 }
    }
  }, {
    name: { plural: 'channels_tasks', singular: 'channel_task' },
    classMethods: {
      associate: function associate(models) {
        // Include deep populate, model and as
        this.include = [
          { model: models.Channel, as: 'channel' },
          { model: models.Task, as: 'task' }
        ];
        ChannelTask.belongsTo(models.Channel, { as: 'channel' });
        ChannelTask.belongsTo(models.Task, { as: 'task' });
      }
    },
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // Table name
    tableName: 'channels_tasks',

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true
  });
  return ChannelTask;
};
