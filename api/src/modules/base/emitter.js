const EventEmitter = require('events');
const parameters = require('./../../config/parameters');
class NotificationEmitter extends EventEmitter {}
const notificationEmitter = new NotificationEmitter();

const ModuleLoader = require('../../libraries/ModuleLoader');
const moduleLoader = new ModuleLoader(parameters.MODULES, null, 'modules', true);
const mds = moduleLoader.getComponents('listeners');

for (let s = 0; s < mds.length; s++) {
  try {
    const cFile = mds[s];
    const listener = require(cFile);
    listener(notificationEmitter);
  } catch (e) {
    console.log(e);
  }
}

module.exports = notificationEmitter;
