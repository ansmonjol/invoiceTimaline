import * as ACTION_TYPE from './constants'

export const initialState = {
  oneUser: {},
  oneAccount: {},
}

export default function authStore(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case ACTION_TYPE.AUTH_LOGIN:
      newState.loading = true;
      break;

    case ACTION_TYPE.AUTH_LOGIN_FAILURE:
      newState.loading = false;
      break;

    case ACTION_TYPE.AUTH_LOGIN_SUCCESS:
      newState.loading = false;
      break;

    default:
      break;
  }
  return newState;
}
