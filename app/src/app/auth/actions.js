import { Storage } from 'shared/storage'
import { loginQL } from './graph'
import * as ACTION_TYPES from './constants'
import { browserHistory } from 'react-router'

export function login({ email, password }) {
  return async (dispatch) => {
    try {
      // Display loader when waiting for response
      dispatch({ type: ACTION_TYPES.AUTH_LOGIN });

      // call to data base
      const res = await loginQL({ email, password });

      // If no pages
      if (!res || !res.login.account || !res.login.user) return dispatch({ type: ACTION_TYPES.AUTH_LOGIN_FAILURE });

      // Set Storage with credential infos
      Storage.set('accountId', res.login.account.id);
      Storage.set('userId', res.login.user.id);

      // Navigate
      browserHistory.push('/');

      // Dispacth results
      dispatch({ type: ACTION_TYPES.AUTH_LOGIN_SUCCESS, payload: { ...res } });
    } catch (e) {
      dispatch({ type: ACTION_TYPES.AUTH_LOGIN_FAILURE });
    }
  }
}