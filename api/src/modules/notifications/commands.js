const Mailler = require('./index');

module.exports = [
  function (program) {
    const row = {
      url: 'https://invoice-timeline.co'
      // token: 201415,
      // account: {
      //   accountId: 'test',
      //   name: 'Test App'
      // },
      // name: 'Mana Engine',
      // password: '2U3_TKHYi',
      // user: {
      //   fullName: 'Gérard TOKO',
      //   email: 'alexandre.monjol@gmail.com'
      // }
    };

    program
    .command('notification:test')
    .description('Test mandrill email')
    .action(async () => {
      await Mailler.sendTemplate({
        bodyParams: row,
        template_id: 'Template id',
        recipients: [{ email: 'alexandre.monjol@gmail.com' }]
      });
    });
  }
];
