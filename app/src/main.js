import React from 'react'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { FixNamedRoutesSupport as fixNamedRoutesSupport } from 'react-router-named-routes'
import * as reducers from './app/reducers'
import { DISABLED_LOG_REDUX } from './locale'
import routes from './routes'


fixNamedRoutesSupport(routes);

const logger = createLogger();
const reducer = combineReducers({ ...reducers, routing: routerReducer })
let store = null

if (DISABLED_LOG_REDUX === true) {
  store = applyMiddleware(thunk)(createStore)(reducer)
} else {
  store = applyMiddleware(thunk, logger)(createStore)(reducer)
}

const history = syncHistoryWithStore(browserHistory, store)

// Set an app container in window object
window.__myapp_container = document.getElementById('root');

// Listen to virtual page view change
// history.listen((location) => {
//   window.ga('send', 'pageview', location.pathname);
// });

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  window.__myapp_container
)
