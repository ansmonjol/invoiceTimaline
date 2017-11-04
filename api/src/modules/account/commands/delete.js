// const models = require('../../graph/models');
// const moment = require('moment');
// const emitter = require('./../../base/emitter');
// const localeConfig = require('./../../../config/locale');
// const Raven = require('raven');
//
// /**
// * [description]
// * @param  {[type]} program [description]
// * @return {[type]}         [description]
// */
function relance(program) {
//   program
//   .command('account:delete')
//   .description('Delete account for disabled')
//   .action(async () => {
//     const accounts = await models.Account.findAll({
//       where: {
//         status: [100, 101, 102],
//         deleteTeamDate: { $ne: null }
//       }
//     });
//
//     for (let l = 0; l < accounts.length; l++) {
//       try {
//         const account = accounts[l];
//         // Number of day expired
//         const duration = Number(
//           moment.duration(
//             moment().diff(moment(new Date(account.deleteTeamDate)))
//           ).asDays().toFixed(0)
//         );
//
//         // First alert
//         if (duration === 0) {
//           await account.updateAttributes({ status: 99 });
//           // emitter.emit('account:disabledonsystem', { account });
//         }
//       } catch (e) {
//         console.log(e);
//         if (localeConfig.ENVIRONNEMENT_APPLICATION === 'production') Raven.captureException(e);
//       }
//     }
//   });
}

module.exports = [relance];
