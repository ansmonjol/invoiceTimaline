const shortid = require('shortid');
const Hashes = require('jshashes');
const emitter = require('./../../base/emitter');

module.exports = function User(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      defaultValue: shortid.generate,
      primaryKey: true
    },

    firstName: { type: DataTypes.STRING },
    lastName: DataTypes.STRING,
    fullName: { type: DataTypes.STRING },

    email: { type: DataTypes.STRING, allowNull: false },

    password: DataTypes.STRING,

    language: { type: DataTypes.STRING, defaultValue: 'fr' },

    // 100: User
    // 101: Admin
    // 102: SuperAdmin
    role: { type: DataTypes.INTEGER, defaultValue: 100 },

    // 100: Enabled
    // 101: Disabled
    // 99: Archived
    status: { type: DataTypes.INTEGER, defaultValue: 100 },
  }, {
      name: { plural: 'users', singular: 'user' },
      classMethods: {
        associate(models) {
          this.order = [['firstName', 'ASC'], ['lastName', 'ASC']];

          this.include = [
            { model: models.Account, as: 'account' },
          ];

          this.belongsTo(models.Account, { as: 'account' });

          const saveHook = async function saveHook(row) {
            row.fullName = `${row.firstName} ${row.lastName}`;
          };

          this.hook('beforeBulkCreate', async function beforeBulkCreate(rows) {
            for (let i = 0; i < rows.length; i++) await saveHook(rows[i]);
          });

          this.hook('beforeCreate', async (row) => { await saveHook(row); });

          this.hook('beforeUpdate', async (row, options) => {
            if ((options.fields.indexOf('fullName') < 0)) { await saveHook(row); }
          });

          this.hook('beforeSave', async (row, options) => {
            if ((options.fields.indexOf('fullName') < 0)) { await saveHook(row); }
          });
        }
      },
      // don't delete database entries but set the newly added attribute deletedAt
      // to the current date (when deletion was done). paranoid will only work if
      // timestamps are enabled
      paranoid: true,

      // Table name
      tableName: 'users',

      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: false
    });
};
