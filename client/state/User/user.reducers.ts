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
      return { ...state, loading: true, error: null };
    case ActionTypes.USER_LOGIN_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case ActionTypes.USER_LOGIN_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.GET_CURRENT_USER:
      return { ...state, data: action.payload };
    case ActionTypes.USER_LOGOUT:
      return { ...state, data: action.payload };
    case ActionTypes.CLEAN_USER_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state: UserState = userInitialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case ActionTypes.USER_REGISTER_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.USER_REGISTER_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case ActionTypes.USER_REGISTER_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.CLEAN_USER_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const userUpdateReducer = (
  state: UserState = userInitialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case ActionTypes.USER_UPDATE_START:
      return { ...state, loading: true, error: null, success: false };
    case ActionTypes.USER_UPDATE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
        success: true,
      };
    case ActionTypes.USER_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case ActionTypes.CLEAN_USER_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};
