import { PAGINATION_ITEMS } from 'src/parameters'

import * as ACTION_TYPE from './constants'

export const initialState = {
  listInvoice: [],
  oneInvoice: {
    customer: {},
    timeline: []
  },
  pages: 0,
  countInvoices: 0,
}

export default function invoiceStore(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case ACTION_TYPE.INVOICE_LIST_INVOICE:
      newState.loading = true;
      break;

    case ACTION_TYPE.INVOICE_LIST_INVOICE_FAILURE:
      newState.loading = false;
      break;

    case ACTION_TYPE.INVOICE_LIST_INVOICE_SUCCESS:
      newState.loading = false;
      newState.listInvoice = action.payload.listInvoice;
      newState.pages = Math.ceil(action.payload.countInvoice / PAGINATION_ITEMS);
      newState.countInvoice = action.payload.countInvoice;
      break;


    case ACTION_TYPE.INVOICE_ONE_INVOICE:
      newState.loading = true;
      break;

    case ACTION_TYPE.INVOICE_ONE_INVOICE_FAILURE:
      newState.loading = false;
      break;

    case ACTION_TYPE.INVOICE_ONE_INVOICE_SUCCESS:
      newState.loading = false;
      newState.oneInvoice = action.payload.oneInvoice;
      break;


    case ACTION_TYPE.INVOICE_UPDATE_INVOICE:
      newState.loading = true;
      break;

    case ACTION_TYPE.INVOICE_UPDATE_INVOICE_FAILURE:
      newState.loading = false;
      break;

    case ACTION_TYPE.INVOICE_UPDATE_INVOICE_SUCCESS:
      newState.loading = false;
      newState.oneInvoice = { ...newState.oneInvoice, ...action.payload.updateInvoice };
      newState.oneInvoice.timeline.unshift({ ...action.payload.addTimeline })
      break;

    default:
      break;
  }
  return newState;
}
