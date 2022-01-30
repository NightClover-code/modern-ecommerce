import { ActionTypes } from './user.action-types';
import { UserAction } from './user.actions';
import { userInitialState } from './user.initial-state';
import { UserState } from './user.state';

export const userLoginReducer = (
  state: UserState = userInitialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_START:
      return { ...state, loading: true };
    case ActionTypes.USER_LOGIN_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case ActionTypes.USER_LOGIN_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.USER_LOGOUT:
      return { ...state, data: action.payload };

    case ActionTypes.GET_CURRENT_USER:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
