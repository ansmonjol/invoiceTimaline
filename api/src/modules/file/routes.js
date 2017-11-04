const Controller = require('./controllers');
const koaBody = require('koa-body')();

module.exports = function Router(router) {
  router.get('/api/file', koaBody, Controller.action);
};
