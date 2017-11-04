import * as ACTION_TYPE from './constants'

export const initialState = {
  listInvoice: []
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
      break;

    default:
      break;
  }
  return newState;
}
