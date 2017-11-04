'use strict';
const LoadController = require('./controllers/LoadController');
const koaBody = require('koa-body')();

module.exports = function Router(router) {
  router.get('/api/files/:id', koaBody, LoadController.action);
};
