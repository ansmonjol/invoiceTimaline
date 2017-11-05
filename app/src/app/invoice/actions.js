import Storage from 'shared/storage'

import * as ACTION_TYPES from './constants'
import {
  listInvoiceQL,
  oneInvoiceQL,
  updateInvoiceQL,
} from './graph'

/**
 * Get list of invoices
 * @param {Object} query Object for query fetch
 * @returns {Array}      Array on invoices
 */
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

/**
 * Get one invoice
 * @param {Integer} id Id of invoice to retrieve
 * @return {Object}   Invoice object
 */
export function oneInvoice(id) {
  return async (dispatch) => {
    try {
      // Display loader when waiting for response
      dispatch({ type: ACTION_TYPES.INVOICE_ONE_INVOICE });

      // List invoices
      const res = await oneInvoiceQL(id);

      // If error
      if (!res) return dispatch({ type: ACTION_TYPES.INVOICE_ONE_INVOICE_FAILURE });

      // Dispacth results
      dispatch({ type: ACTION_TYPES.INVOICE_ONE_INVOICE_SUCCESS, payload: { ...res } });
    } catch (e) {
      dispatch({ type: ACTION_TYPES.INVOICE_ONE_INVOICE_FAILURE });
    }
  }
}

/**
 * Get one invoice
 * @param {Integer} id Id of invoice to retrieve
 * @return {Object}   Invoice object
 */
export function updateInvoice(invoice, timeline) {
  return async (dispatch) => {
    try {
      // Display loader when waiting for response
      dispatch({ type: ACTION_TYPES.INVOICE_UPDATE_INVOICE });

      // List invoices
      const res = await updateInvoiceQL(invoice, timeline);

      // If error
      if (!res) return dispatch({ type: ACTION_TYPES.INVOICE_UPDATE_INVOICE_FAILURE });

      // Should be done in a redux observable
      Storage.set('success', 'Payment saved')

      // Dispacth results
      dispatch({ type: ACTION_TYPES.INVOICE_UPDATE_INVOICE_SUCCESS, payload: { ...res } });
    } catch (e) {
      dispatch({ type: ACTION_TYPES.INVOICE_UPDATE_INVOICE_FAILURE });
    }
  }
}
