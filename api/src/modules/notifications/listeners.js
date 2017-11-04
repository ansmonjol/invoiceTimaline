const Mailler = require('./index');
const localeConfig = require('../../config/locale');
const moment = require('moment');
const parameters = require('../../config/parameters');

const getArgs = ({ data }) => {
  data.user = data.user || {};
  data.account = data.account || {};
  data.author = data.author || {};
  data.token = data.token || {};
  data.project = data.project || {};
  const row = {};
  if (data.passwordClean) row.password = data.passwordClean;
  if (data.user.email) row.userEmail = data.user.email;
  if (data.user.firstName) row.firstName = data.user.firstName;
  if (data.user.lastName) row.lastName = data.user.lastName;
  if (data.fullName) row.fullName = data.fullName;
  if (!data.fullName) row.fullname = `${data.user.firstName} ${data.user.lastName}`;
  if (data.account.accountId) row.accountId = data.account.accountId;
  if (data.account.name) row.accountName = data.account.name;
  if (data.account.deleteTeamDate) row.deleteTeamDate = data.account.deleteTeamDate;
  if (data.author.lastName) row.authorLastName = data.author.lastName;
  if (data.author.firstName) row.authorFirstName = data.author.firstName;
  if (data.name) row.projectName = data.name;
  if (data.id) row.projectId = data.id;
  if (data.token.code) row.code = data.token.code;
  if (data.token.id || data.user.id) row.tokenid = data.token.id || data.user.id;
  if (data.account.expirationDate) row.expirationDate = data.account.expirationDate;
  row.DOMAIN = localeConfig.DOMAIN || 'https://billypay.me';
  return row;
};

/**
 * [exports description]
 * @param  {[type]}  notificationEmitter [description]
 * @return {Promise}                     [description]
 */
module.exports = async (notificationEmitter) => {
  /**
   * [account description]
   * @type {[type]}
   */
  notificationEmitter.on('account:create_account', ({ row, language }) => {
    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: row }),
        template_id: parameters.TEMPLATE_IDS[language]['account:create_account'],
        recipients: [{ email: row.user.email }]
      });
    })();
  });

  /**
   * [account description]
   * @type {[type]}
   */
  notificationEmitter.on('account:create_account:success', ({ row, language }) => {
    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: row }),
        template_id: parameters.TEMPLATE_IDS[language]['account:create_account:success'],
        recipients: [{ email: row.user.email }]
      });

      // Add user in newsletter
      await Mailler.subscribe(row.user);
    })();
  });

  /**
   * [DOMAIN description]
   * @type {[type]}
   */
  notificationEmitter.on('newproject', ({ row, language }) => {
    return (async () => {
      for (let u = 0; u < row.users.length; u++) {
        const user = row.users[u];
        if (user.user.accepted === true) {
          await Mailler.sendTemplate({
            bodyParams: getArgs({ data: row }),
            template_id: parameters.TEMPLATE_IDS[language].newproject,
            recipients: [{ email: user.user.email }]
          });
        }
      }
    })();
  });

  /**
   * [user description]
   * @type {[type]}
   */
  notificationEmitter.on('user:forceUpdatePassword', ({ row, language }) => {
    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: row }),
        template_id: parameters.TEMPLATE_IDS[language]['user:forceUpdatePassword'],
        recipients: [{ email: row.email }]
      });
    })();
  });

  /**
   * [account description]
   * @type {[type]}
   */
  notificationEmitter.on('account:newpassword', ({ row, language }) => {
    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: row }),
        template_id: parameters.TEMPLATE_IDS[language]['account:newpassword'],
        recipients: [{ email: row.user.email }]
      });
    })();
  });

  /**
   * [account description]
   * @type {[type]}
   */
  notificationEmitter.on('account:url', ({ row, language }) => {
    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: row }),
        template_id: parameters.TEMPLATE_IDS[language]['account:url'],
        recipients: [{ email: row.user.email }]
      });
    })();
  });

  /**
   * [delete description]
   * @type {[type]}
   */
  notificationEmitter.on('delete:account', ({ row, language }) => {
    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: row }),
        template_id: parameters.TEMPLATE_IDS[language]['delete:account'],
        recipients: [{ email: row.account.mail || row.account.billingEmail }]
      });
    })();
  });

  /**
   * [DOMAIN description]
   * @type {[type]}
   */
  notificationEmitter.on('updatepassword', ({ row, language }) => {
    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: row }),
        template_id: parameters.TEMPLATE_IDS[language].updatepassword,
        recipients: [{ email: row.user.email }]
      });
    })();
  });

  /**
   * [account description]
   * @type {[type]}
   */
  notificationEmitter.on('account:invitation', ({ row, language, _models }) => {
    return (async () => {
      try {
        const record = await _models.User.find({
          where: { id: row.user.id },
          include: [
            { model: _models.Account, as: 'account' },
            { model: _models.User, as: 'author' }
          ]
        });

        row.DOMAIN = localeConfig.DOMAIN || 'https://billypay.me';
        row.user = JSON.parse(JSON.stringify(record));
        row.account = record.account;
        row.author = record.author;
        row.token = row;

        await Mailler.sendTemplate({
          bodyParams: getArgs({ data: row }),
          template_id: parameters.TEMPLATE_IDS[language]['account:invitation'],
          recipients: [{ email: row.user.email }]
        });

        // Add user in newsletter
        await Mailler.subscribe(row.user);
      } catch (e) {
        console.log(e);
      }
    })();
  });

  /**
   * [u description]
   * @type {Number}
   */
  notificationEmitter.on('addBulkUser', ({ records, _models, language }) => {
    return (async () => {
      if (_models) {
        for (let u = 0; u < records.length; u++) {
          const record = await _models.User.find({
            where: { id: records[u].id },
            include: [
              { model: _models.Account, as: 'account' },
              { model: _models.User, as: 'author' }
            ]
          });

          if (record) {
            const row = {};
            row.DOMAIN = localeConfig.DOMAIN || 'https://billypay.me';
            row.user = JSON.parse(JSON.stringify(record));
            row.account = row.user.account;
            row.author = row.user.author;
            row.token = record;

            await Mailler.sendTemplate({
              bodyParams: getArgs({ data: row }),
              template_id: parameters.TEMPLATE_IDS[language]['account:invitation'],
              recipients: [{ email: row.user.email }]
            });

            // Add user in newsletter
            await Mailler.subscribe(row.user);
          }
        }
      }
    })();
  });

  /**
   * [account description]
   * @type {[type]}
   */
  notificationEmitter.on('account:invitation:success', ({ row, language }) => {
    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: row }),
        template_id: parameters.TEMPLATE_IDS[language]['account:invitation:success'],
        recipients: [{ email: row.user.email }]
      });
    })();
  });

  /**
   * Invoice data
   * @param  {[type]}  row        [description]
   * @param  {[type]}  invoice    [description]
   * @param  {[type]}  attachment [description]
   * @param  {[type]}  account    [description]
   * @param  {[type]}  language   [description]
   * @param  {[type]}  template   [description]
   * @return {Promise}            [description]
   */
  // const invoiceSender = async ({ row, invoice, attachment, account, language, template }) => {
  //   const args = getArgs({ data: row });
  //   const billToPDF = new BillToPDF();
  //   args.date = moment(row.date).locale(language).format('MMMM YYYY');
  //   args.INVOICENUMBER = billToPDF.pad(invoice.number, 5);
  //   args.ACCOUNTNAME = account.name;
  //   args.AMOUNT = BillToPDF.getPriceDisplay(invoice.amount, account.currency);
  //   args.ACCOUNTNUMBER = '0000-000-0001';
  //   args.ACCOUNTID = account.accountId;
  //   await Mailler.sendTemplate({
  //     bodyParams: args,
  //     template_id: parameters.TEMPLATE_IDS[language][template],
  //     invoice: attachment,
  //     recipients: [{ email: account.billingEmail }]
  //   });
  // };

  /**
   * [account description]
   * @type {[type]}
   */
  notificationEmitter.on('account:invoice:success', ({ row, invoice, attachment, account, language }) => {
    return (async () => {
      await invoiceSender({ row, invoice, attachment, account, language, template: 'account:invoice:success' });
    })();
  });

  /**
   * [account description]
   * @type {[type]}
   */
  notificationEmitter.on('account:invoice:faillure', ({ row, account, attachment, invoice, language }) => {
    return (async () => {
      await invoiceSender({ row, invoice, attachment, account, language, template: 'account:invoice:faillure' });
    })();
  });

  /**
   * [account description]
   * @type {[type]}
   */
  notificationEmitter.on('account:invoice:failure2', ({ row, account, attachment, invoice, language }) => {
    return (async () => {
      await invoiceSender({ row, invoice, attachment, account, language, template: 'account:invoice:failure2' });
    })();
  });


  /**
   * [account description]
   * @type {[type]}
   */
  notificationEmitter.on('account:invoice:failure3', ({ row, account, attachment, invoice, language }) => {
    return (async () => {
      await invoiceSender({ row, invoice, attachment, account, language, template: 'account:invoice:failure3' });
    })();
  });

  /**
   * [account description]
   * @type {[type]}
   */
  notificationEmitter.on('account:invoice:failureevery', ({ row, account, attachment, invoice, language }) => {
    return (async () => {
      await invoiceSender({ row, invoice, attachment, account, language, template: 'account:invoice:failureevery' });
    })();
  });

  notificationEmitter.on('account:expiredbegin7', ({ account }) => {
    account = JSON.parse(JSON.stringify(account));
    account.expirationDate = moment(new Date()).add(7, 'days').locale(account.language || 'fr').format('LL');

    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: { account } }),
        template_id: parameters.TEMPLATE_IDS[account.language]['account:expiredbegin7'],
        recipients: [{ email: account.mail }]
      });
    })();
  });

  notificationEmitter.on('account:expired', ({ account }) => {
    account = JSON.parse(JSON.stringify(account));
    account.expirationDate = moment(new Date()).locale(account.language || 'fr').format('LL');

    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: { account } }),
        template_id: parameters.TEMPLATE_IDS[account.language]['account:expired'],
        recipients: [{ email: account.mail }]
      });
    })();
  });

  notificationEmitter.on('account:at3days', ({ account }) => {
    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: { account } }),
        template_id: parameters.TEMPLATE_IDS[account.language]['account:at3days'],
        recipients: [{ email: account.mail }]
      });
    })();
  });

  notificationEmitter.on('project:activity', ({ projets, user, account, projectCount }) => {
    return (async () => {
      const args = getArgs({ data: { user, account } });
      args.projects = projets;
      args.projectCount = projectCount;
      if (args.DOMAIN.indexOf('billypay.me')) {
        args.url = `https://${account.accountId}.billypay.me/times?current`;
      }
      if (args.DOMAIN.indexOf('nextglc.eu')) {
        args.url = `https://${account.accountId}.nextglc.eu/times?current`;
      }
      if (args.DOMAIN.indexOf('devglc.eu')) {
        args.url = `https://${account.accountId}.devglc.eu/times?current`;
      }

      await Mailler.sendTemplate({
        bodyParams: args,
        template_id: parameters.TEMPLATE_IDS[account.language]['project:activity'],
        recipients: [{ email: user.email }]
      });
    })();
  });

  notificationEmitter.on('account:thanksforbilling', ({ account }) => {
    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: { account } }),
        template_id: parameters.TEMPLATE_IDS[account.language]['account:thanksforbilling'],
        recipients: [{ email: account.mail }]
      });
    })();
  });

  notificationEmitter.on('account:disabledonsystem', ({ account }) => {
    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: { account } }),
        template_id: parameters.TEMPLATE_IDS[account.language]['account:disabledonsystem'],
        recipients: [{ email: account.mail }]
      });
    })();
  });

  /**
   * [account description]
   * @type {[type]}
   */
  notificationEmitter.on('account:comback', ({ row, language }) => {
    return (async () => {
      await Mailler.sendTemplate({
        bodyParams: getArgs({ data: row }),
        template_id: parameters.TEMPLATE_IDS[language]['account:comback'],
        recipients: [{ email: row.user.email }]
      });
    })();
  });
};
