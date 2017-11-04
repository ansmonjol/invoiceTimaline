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
    accountId: { type: DataTypes.STRING, allowNull: false },

    vat: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    mail: { type: DataTypes.STRING },

    sizeTeam: { type: DataTypes.STRING },
    knowApp: { type: DataTypes.STRING },

    birthday: { type: DataTypes.DATE, defaultValue: new Date() },

    billableRate: DataTypes.FLOAT,
    alertRate: { type: DataTypes.FLOAT, defaultValue: 80 },
    deleteTeamDate: { type: DataTypes.DATE },
    allowInvite: { type: DataTypes.BOOLEAN, defaultValue: false },
    disableEditTime: { type: DataTypes.BOOLEAN, defaultValue: false },
    disableNote: { type: DataTypes.BOOLEAN, defaultValue: false },

    // Hour in day
    totalHourInDay: { type: DataTypes.INTEGER, defaultValue: 7 },

    number: { type: DataTypes.INTEGER },

    // Billing
    billingEmail: { type: DataTypes.STRING },
    billingAddress: { type: DataTypes.STRING },
    billingCountry: { type: DataTypes.STRING },
    billingTVA: { type: DataTypes.STRING },

    // Ip inscription user
    ip: { type: DataTypes.STRING },

    language: { type: DataTypes.STRING, defaultValue: 'fr' },
    currency: { type: DataTypes.STRING, defaultValue: 'EUR' },

    _tags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true, defaultValue: [] },

    // Stop billing suspended
    suspendedAt: { type: DataTypes.DATE },

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
        // this.include = [
        //   { model: models.User, as: 'users' }
        // ];
        // this.hasMany(models.User, { as: 'users', foreignKey: 'accountId' });

        // For billing
        const eventUpdateUser = async (row) => { emitter.emit('account:event', { account: row, models }); };
        this.hook('afterDestroy', eventUpdateUser);
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
