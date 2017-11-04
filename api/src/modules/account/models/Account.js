const shortid = require('shortid');
const emitter = require('./../../base/emitter');

module.exports = function Account(sequelize, DataTypes) {
  return sequelize.define('Account', {
    id: {
      type: DataTypes.STRING,
      defaultValue: shortid.generate,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },

    // infos
    address: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    zip: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },

    // Billing
    billingEmail: { type: DataTypes.STRING },
    billingAddress: { type: DataTypes.STRING },
    billingCountry: { type: DataTypes.STRING },
    billingZip: { type: DataTypes.STRING },
    billingTVA: { type: DataTypes.STRING },

    language: { type: DataTypes.STRING, defaultValue: 'fr' },
    currency: { type: DataTypes.STRING, defaultValue: 'EUR' },

    // 101: Suspended
    // 100: Enabled
    // 99: Archived
    status: { type: DataTypes.INTEGER, defaultValue: 100 },
  }, {
    name: { plural: 'accounts', singular: 'account' },
    classMethods: {
      associate: function associate(models) {
        // set default order
        this.order = [['name', 'ASC']];

        // // Relations
        // this.include = [
        //   { model: models.User, as: 'users' }
        // ];

        // this.hasMany(models.User, { as: 'users', foreignKey: 'accountId' });
      }
    },
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // Table name
    tableName: 'accounts',

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: false
  });
};
