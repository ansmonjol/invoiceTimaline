const Controller = require('./controllers');
const koaBody = require('koa-body')();

/**
 * [exports description]
 * @param  {[type]} router [description]
 * @return {[type]}        [description]
 */
module.exports = function Router(router) {
  router.post('/api/graph', koaBody, Controller.graph);
};
