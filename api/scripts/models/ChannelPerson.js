'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChannelPerson = sequelize.define('ChannelPerson', {
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: { isUUID: 4 }
    }
  }, {
    name: { plural: 'channels_people', singular: 'channel_person' },
    classMethods: {
      associate: function associate(models) {
        // Include deep populate, model and as
        this.include = [
          { model: models.Channel, as: 'channel' },
          { model: models.User, as: 'person' }
        ];
        ChannelPerson.belongsTo(models.Channel, { as: 'channel' });
        ChannelPerson.belongsTo(models.User, { as: 'person' });
      }
    },
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // Table name
    tableName: 'channels_people',

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true
  });

  return ChannelPerson;
};
