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
      return { ...state, loading: false, data: action.payload };
    case ActionTypes.USER_LOGIN_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
