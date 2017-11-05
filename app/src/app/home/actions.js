import * as ACTION_TYPES from './constants'
import {
  getDataQL,
} from './graph'

/**
 * Get datas
 * @return {Object} Object of datas
 */
export function getData(query = {}) {
  return async (dispatch) => {
    try {
      // Display loader when waiting for response
      dispatch({ type: ACTION_TYPES.HOME_GET_DATAS });

      // Get datas
      const res = await getDataQL(query);

      // If error
      if (!res) return dispatch({ type: ACTION_TYPES.HOME_GET_DATAS_FAILURE });

      // Dispacth results
      dispatch({ type: ACTION_TYPES.HOME_GET_DATAS_SUCCESS, payload: { ...res } });
    } catch (e) {
      dispatch({ type: ACTION_TYPES.HOME_GET_DATAS_FAILURE });
    }
  }
}
