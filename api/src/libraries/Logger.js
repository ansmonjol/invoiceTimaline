'use strict';
const parameters = require('./../config/parameters');
const colors = require('colors');
const moment = require('moment');

class Logger {

  static log(text, color) {
    let log;

    if (color) {
      log = colors[color](text);
    }
    console.log(`${moment().format('\\[YYYY-MM-DD HH:mm:ss\\]')} ${parameters.APPLICATION_NAME} - ${log}`);
  }
}

module.exports = Logger;
