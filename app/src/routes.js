import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { Storage } from 'shared/storage'

import App from './app'
import {
  Home,
  Auth,
  NotFound,
  Invoice,
  OneInvoice,
  Payment,
  Customer,
} from './app/components'


/**
 * Check if user is logged
 * @param  {[type]} nextState [description]
 * @param  {[type]} replace   [description]
 * @return {[type]}           [description]
 */
function requireAuth(nextState, replace) {
  if (!Storage.get('accountId') && !Storage.get('userId')) {
    replace({ pathname: '/login', state: { nextPathname: nextState.location.pathname } });
    return true;
  }
  return false;
}

/**
 * Serail compose for onEnter route functions
 * @param  {[type]} hooks [description]
 * @return {[type]}       [description]
 */
/* eslint-disable */
function composeEnterHooksSeries(...hooks) {
  return function onEnter(nextState, replace, executeTransition) {
    (function executeHooksSynchronously(remainingHooks) {
      if (!remainingHooks.length) return executeTransition();
      const nextHook = remainingHooks[0];
      if (nextHook.length >= 3) {
        nextHook.call(this, nextState, replace, () => {
          executeHooksSynchronously(remainingHooks.slice(1))
        });
      } else {
        nextHook.call(this, nextState, replace);
        executeHooksSynchronously(remainingHooks.slice(1));
      }
    })(hooks);
  };
}
/* eslint-enable */


module.exports = (
  <Route onChange={() => window.scrollTo(0, 0)} name="home" path="/" component={App}>
    <IndexRoute onEnter={composeEnterHooksSeries(requireAuth)} component={Home} />

    // Auth
    <Route name="login" path="login" component={Auth} />

    // App
    <Route onEnter={composeEnterHooksSeries(requireAuth)} name="login" path="/invoices" component={Invoice} />
    <Route onEnter={composeEnterHooksSeries(requireAuth)} name="login" path="/invoices/:id" component={OneInvoice} />
    <Route onEnter={composeEnterHooksSeries(requireAuth)} name="login" path="/payments" component={Payment} />
    <Route onEnter={composeEnterHooksSeries(requireAuth)} name="login" path="/customers" component={Customer} />

    <Route path="*" component={NotFound} />
  </Route>
);
