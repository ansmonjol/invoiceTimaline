module.exports = {
  'Login test': function (browser) {
    browser
      .url('http://billypay.local:8081')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'account0')
      .click('.lbtn')
      .pause(2000)
      .setValue('input.email', 'user0@user.co')
      .setValue('input.password', 'user')
      .click('.lubtn')
      .pause(100000)
      // .assert.containsText('#main', 'Night Watch')
      .end();
  }
};
