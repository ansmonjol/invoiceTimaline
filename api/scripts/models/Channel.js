'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: { isUUID: 4 }
    },
    name: { type: DataTypes.STRING, allowNull: false },
    code: DataTypes.STRING,
    start: { type: DataTypes.DATEONLY, allowNull: false },
    end: { type: DataTypes.DATEONLY, allowNull: false },
    note: { type: DataTypes.TEXT },

    invoicable: DataTypes.BOOLEAN,
    invoice_method: { type: DataTypes.NUMBER },
    invoice_data: { type: DataTypes.JSONB },

    budgetable: DataTypes.BOOLEAN,
    budget_method: { type: DataTypes.NUMBER },
    budget_data: { type: DataTypes.JSONB },
    alert_percent: { type: DataTypes.NUMBER },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    name: { plural: 'channels', singular: 'channel' },
    classMethods: {
      associate: function associate(models) {
        // Include deep populate, model and as
        this.include = [
          { model: models.ChannelPerson, as: 'people' },
          { model: models.ChannelTask, as: 'tasks' }
        ];

        Channel.hasMany(models.ChannelPerson, { as: 'people' });
        Channel.hasMany(models.ChannelTask, { as: 'tasks' });
      }
    },
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // Table name
    tableName: 'channels',

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true
  });

  return Channel;
};
