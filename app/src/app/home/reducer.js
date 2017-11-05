import { PAGINATION_ITEMS } from 'src/parameters'

import * as ACTION_TYPE from './constants'

export const initialState = {
  countInvoice: 0,
  countCustomer: 0,
}

export default function homeStore(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case ACTION_TYPE.HOME_GET_DATAS:
      newState.loading = true;
      break;

    case ACTION_TYPE.HOME_GET_DATAS_FAILURE:
      newState.loading = false;
      break;

    case ACTION_TYPE.HOME_GET_DATAS_SUCCESS:
      newState.loading = false;
      newState.countInvoice = action.payload.countInvoice;
      newState.countCustomer = action.payload.countCustomer;
      break;

    default:
      break;
  }
  return newState;
}
