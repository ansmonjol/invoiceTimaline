const shortid = require('shortid');
const emitter = require('./../../base/emitter');

module.exports = function Customer(sequelize, DataTypes) {
  return sequelize.define('Customer', {
    id: {
      type: DataTypes.STRING,
      defaultValue: shortid.generate,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },

    logo: { type: DataTypes.STRING },

    // infos
    address: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    zip: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },

    currency: { type: DataTypes.STRING, defaultValue: 'EUR' },

    // 101: Suspended
    // 100: Enabled
    // 99: Archived
    status: { type: DataTypes.INTEGER, defaultValue: 100 },
  }, {
    name: { plural: 'customers', singular: 'customer' },
    classMethods: {
      associate: function associate(models) {
        // set default order
        this.order = [['name', 'ASC']];

        this.include = [
          { model: models.Account, as: 'account' },
        ];

        this.belongsTo(models.Account, { as: 'account' });
      }
    },
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // Table name
    tableName: 'customers',

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: false
  });
};
