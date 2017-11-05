const shortid = require('shortid');
const Hashes = require('jshashes');
const emitter = require('./../../base/emitter');

module.exports = function Timeline(sequelize, DataTypes) {
  return sequelize.define('Timeline', {
    id: {
      type: DataTypes.STRING,
      defaultValue: shortid.generate,
      primaryKey: true
    },

    title: { type: DataTypes.STRING },

    content: { type: DataTypes.TEXT },

    // 100: Life event
    // 101: Date
    // 102: Reminder
    // 103: Comment
    // 104: Payment
    type: { type: DataTypes.INTEGER, defaultValue: 100 },

    // 100: Enabled
    // 101: Disabled
    // 99: Archived
    status: { type: DataTypes.INTEGER, defaultValue: 100 },
  }, {
      name: { plural: 'timelines', singular: 'timeline' },
      classMethods: {
        associate(models) {
          this.order = [['createdAt', 'DESC']];

          this.include = [
            { model: models.Account, as: 'account' },
            { model: models.Invoce, as: 'invoice' },
            { model: models.User, as: 'user' },
          ];

          this.belongsTo(models.Account, { as: 'account' });
          this.belongsTo(models.Invoice, { as: 'invoice' });
          this.belongsTo(models.User, { as: 'user' });
        }
      },
      // don't delete database entries but set the newly added attribute deletedAt
      // to the current date (when deletion was done). paranoid will only work if
      // timestamps are enabled
      paranoid: true,

      // Table name
      tableName: 'timelines',

      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: false
    });
};
