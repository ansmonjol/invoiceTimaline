import * as ACTION_TYPES from './constants'
import {
  listInvoiceQL
} from './graph'

export function listInvoice(query = {}) {
  return async (dispatch) => {
    try {
      // Display loader when waiting for response
      dispatch({ type: ACTION_TYPES.INVOICE_LIST_INVOICE });

      // List invoices
      const res = await listInvoiceQL(query);

      // If error
      if (!res) return dispatch({ type: ACTION_TYPES.INVOICE_LIST_INVOICE_FAILURE });

      // Dispacth results
      dispatch({ type: ACTION_TYPES.INVOICE_LIST_INVOICE_SUCCESS, payload: { ...res } });
    } catch (e) {
      dispatch({ type: ACTION_TYPES.INVOICE_LIST_INVOICE_FAILURE });
    }
  }
}