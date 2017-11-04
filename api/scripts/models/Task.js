'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: { isUUID: 4 }
    },
    name: { type: DataTypes.STRING, allowNull: false },
    hourly_rate: DataTypes.STRING
  }, {
    name: { plural: 'tasks', singular: 'task' },
    classMethods: {
      associate: function associate(models) {
        // Include deep populate, model and as
      }
    },
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // Table name
    tableName: 'tasks',

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true
  });

  return Task;
};
