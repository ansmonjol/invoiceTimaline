'use strict';
module.exports = (sequelize, DataTypes) => {
  const Time = sequelize.define('Time', {
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: { isUUID: 4 }
    },
    note: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATEONLY },
    duration: DataTypes.STRING
  }, {
    name: { plural: 'times', singular: 'times' },
    classMethods: {
      associate: function associate(models) {
        // Include deep populate, model and as
        this.include = [
          { model: models.Task, as: 'task' },
          { model: models.Channel, as: 'channel' }
        ];
        Time.belongsTo(models.Channel, { as: 'channel' });
        Time.belongsTo(models.Task, { as: 'task' });
      }
    },
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // Table name
    tableName: 'times',

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true
  });

  return Time;
};
