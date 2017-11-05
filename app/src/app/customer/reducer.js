import { PAGINATION_ITEMS } from 'src/parameters'

import * as ACTION_TYPE from './constants'

export const initialState = {
  listCustomer: [],
  countCustomer: 0,
}

export default function customerStore(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case ACTION_TYPE.CUSTOMER_LIST_CUSTOMER:
      newState.loading = true;
      break;

    case ACTION_TYPE.CUSTOMER_LIST_CUSTOMER_FAILURE:
      newState.loading = false;
      break;

    case ACTION_TYPE.CUSTOMER_LIST_CUSTOMER_SUCCESS:
      newState.loading = false;
      newState.listCustomer = action.payload.listCustomer;
      newState.pages = Math.ceil(action.payload.countCustomer / PAGINATION_ITEMS);
      newState.countCustomer = action.payload.countCustomer;
      break;


    case ACTION_TYPE.CUSTOMER_ONE_CUSTOMER:
      newState.loading = true;
      break;

    case ACTION_TYPE.CUSTOMER_ONE_CUSTOMER_FAILURE:
      newState.loading = false;
      break;

    case ACTION_TYPE.CUSTOMER_ONE_CUSTOMER_SUCCESS:
      newState.loading = false;
      break;

    default:
      break;
  }
  return newState;
}
