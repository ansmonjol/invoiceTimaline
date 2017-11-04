'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: { isUUID: 4 }
    },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: { type: DataTypes.STRING },
    other: DataTypes.STRING,
    department: DataTypes.STRING,
    billable_rate: DataTypes.NUMBER,
    cost_rate: DataTypes.NUMBER,
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    name: { plural: 'people', singular: 'person' },
    classMethods: {
      associate: function associate() {
        // Include deep populate, model and as
        this.include = [

        ];
      }
    },
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // Table name
    tableName: 'people',

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true
  });

  return Person;
};
