import Storage from 'shared/storage'
import { browserHistory } from 'react-router'

import * as ACTION_TYPES from './constants'
import {
  loginQL,
  loadDatasQL,
} from './graph'

/**
 *
 * @param {*} param0
 */
export function login({ email, password }) {
  return async (dispatch) => {
    try {
      // Display loader when waiting for response
      dispatch({ type: ACTION_TYPES.AUTH_LOGIN });

      // call to data base
      const res = await loginQL({ email, password });

      // If no pages
      if (!res || !res.login.account || !res.login.user) return dispatch({ type: ACTION_TYPES.AUTH_LOGIN_FAILURE });

      // Set Storage with credential infos (should be done in a redux observable)
      Storage.set('accountId', res.login.account.id);
      Storage.set('userId', res.login.user.id);

      // Navigate (should be done in a redux observable)
      browserHistory.push('/');

      // Dispacth results
      dispatch({ type: ACTION_TYPES.AUTH_LOGIN_SUCCESS, payload: { ...res } });
    } catch (e) {
      dispatch({ type: ACTION_TYPES.AUTH_LOGIN_FAILURE });
    }
  }
}
/**
 *
 * @param {*} param0
 */
export function loadDatas({ accountId, userId }) {
  return async (dispatch) => {
    try {
      // Display loader when waiting for response
      dispatch({ type: ACTION_TYPES.AUTH_LOAD_DATA });

      // call to data base
      const res = await loadDatasQL({ accountId, userId });

      // If no pages
      if (!res || !res.oneAccount || !res.oneUser) {
        browserHistory.push('/login');
        return dispatch({ type: ACTION_TYPES.AUTH_LOAD_DATA_FAILURE });
      }

      // Set Storage with credential infos (should be done in a redux observable)
      Storage.set('accountId', res.oneAccount.id);
      Storage.set('userId', res.oneUser.id);

      // Dispacth results
      dispatch({ type: ACTION_TYPES.AUTH_LOAD_DATA_SUCCESS, payload: { ...res } });
    } catch (e) {
      dispatch({ type: ACTION_TYPES.AUTH_LOAD_DATA_FAILURE });
    }
  }
}
