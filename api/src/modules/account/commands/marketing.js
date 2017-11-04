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
// function relance(program) {
//   program
//   .command('account:after3')
//   .description('Send email when user create account after 3 days, without project')
//   .action(async () => {
//     const accounts = await models.Account.findAll({
//       where: {
//         createdAt: {
//           $gte: moment().subtract(4, 'days').startOf('month')
//         }
//       }
//     });
//
//     for (let l = 0; l < accounts.length; l++) {
//       try {
//         const account = accounts[l];
//         // Number of day expired
//         const duration = Number(
//           moment.duration(
//             moment().diff(moment(new Date(account.createdAt)))
//           ).asDays().toFixed(0)
//         );
//
//         // First alert
//         if (duration === 3) {
//           const totalProjects = await models.Project.count({ where: { accountId: account.id } });
//           if (totalProjects === 0) {
//             emitter.emit('account:at3days', { account });
//           }
//         }
//       } catch (e) {
//         console.log(e);
//         if (localeConfig.ENVIRONNEMENT_APPLICATION === 'production') Raven.captureException(e);
//       }
//     }
//   });
// }
//
// module.exports = [relance];
