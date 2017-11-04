const moment = require('moment');

class DateHelper {

  static determineDate({ cursor, period, language }) {
    let startdate = moment().locale(language);
    startdate = startdate.startOf(period);
    startdate = startdate.add(cursor, period);
    const enddate = (startdate.clone()).endOf(period);
    return { startdate: startdate.format(), enddate: enddate.format() };
  }
}

module.exports = DateHelper;
