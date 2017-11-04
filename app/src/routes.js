import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './app'
import {
  Home,
  NotFound,
} from './app/components'

/**
 * Compose en série les fonctions onEnter des routes
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
    <IndexRoute onEnter={composeEnterHooksSeries()} component={Home} />

    // All
    // <Route name="oauth" path="oauth/:id" component={'should not be a string here'} />

    <Route path="*" component={NotFound} />
  </Route>
);
