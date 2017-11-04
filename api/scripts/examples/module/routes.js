var IndexController = require('./controllers');

/**
 * Router for index controller
 * @param  {[type]} router [description]
 * @return {[type]}        [description]
 */
module.exports = function(router){
  router.all('/', IndexController.index);
};