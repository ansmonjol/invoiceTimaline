import * as ACTION_TYPES from './constants'
import {
  listCustomerQL,
  oneCustomerQL,
} from './graph'

/**
 * Get list of customers
 * @param  {Object} query Object for query fetch
 * @return {Array}         Array on customers
 */
export function listCustomer(query = {}) {
  return async (dispatch) => {
    try {
      // Display loader when waiting for response
      dispatch({ type: ACTION_TYPES.CUSTOMER_LIST_CUSTOMER });

      // List customers
      const res = await listCustomerQL(query);

      // If error
      if (!res) return dispatch({ type: ACTION_TYPES.CUSTOMER_LIST_CUSTOMER_FAILURE });

      // Dispacth results
      dispatch({ type: ACTION_TYPES.CUSTOMER_LIST_CUSTOMER_SUCCESS, payload: { ...res } });
    } catch (e) {
      dispatch({ type: ACTION_TYPES.CUSTOMER_LIST_CUSTOMER_FAILURE });
    }
  }
}

/**
 * Get one invoice
 * @param  {Integer} id Id of invoice to retrieve
 * @return {Object}      Customer object
 */
export function oneCustomer(id) {
  return async (dispatch) => {
    try {
      // Display loader when waiting for response
      dispatch({ type: ACTION_TYPES.CUSTOMER_ONE_CUSTOMER });

      // List customers
      const res = await oneCustomerQL(id);

      // If error
      if (!res) return dispatch({ type: ACTION_TYPES.CUSTOMER_ONE_CUSTOMER_FAILURE });

      // Dispacth results
      dispatch({ type: ACTION_TYPES.CUSTOMER_ONE_CUSTOMER_SUCCESS, payload: { ...res } });
    } catch (e) {
      dispatch({ type: ACTION_TYPES.CUSTOMER_ONE_CUSTOMER_FAILURE });
    }
  }
}
