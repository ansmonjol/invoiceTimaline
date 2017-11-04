const co = require('co');
const Logger = require('./Logger');

const onerror = function (err) {
  Logger.log(`Error: ${err.stack}`, 'red');
  Logger.log(`Error: ${err}`, 'red');
};

/**
 * [exports description]
 * @method exports
 * @param  {[type]} _class [description]
 * @return {[type]}        [description]
 */
module.exports = (_class) => {
  const obj = { _class };
  return () => {
    co(function *() {
      yield (new obj._class()).onAction();
    }).catch(onerror);
  };
};
