import { ActionTypes } from './user.action-types';
import { UserAction } from './user.actions';
import { userInitialState, usersInitialState } from './user.initial-state';
import { UsersState, UserState } from './user.state';

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

    case ActionTypes.USER_LOGOUT:
      return { ...state, data: action.payload };
    case ActionTypes.USER_RESET:
      return { loading: false, data: null, error: null };
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

    case ActionTypes.USER_LOGOUT:
      return { ...state, data: action.payload };
    case ActionTypes.USER_RESET:
      return { loading: false, data: null, error: null };
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state: UserState = userInitialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case ActionTypes.GET_CURRENT_USER_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.GET_CURRENT_USER_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case ActionTypes.GET_CURRENT_USER_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.USER_LOGOUT:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const userEditReducer = (
  state: UserState = userInitialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case ActionTypes.FETCH_USER_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_USER_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case ActionTypes.FETCH_USER_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.FETCH_USER_RESET:
      return { ...state, data: null, error: null };
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

    case ActionTypes.USER_LOGOUT:
      return { ...state, data: action.payload };
    case ActionTypes.USER_UPDATE_RESET:
      return { ...state, data: null, error: null, success: false };
    default:
      return state;
  }
};

export const usersReducer = (
  state: UsersState = usersInitialState,
  action: UserAction
): UsersState => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_USERS_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case ActionTypes.FETCH_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.DELETE_USER_START:
      return { ...state, loading: true, error: null, success: false };
    case ActionTypes.DELETE_USER_SUCCESS:
      return { ...state, loading: false, error: null, success: true };
    case ActionTypes.DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case ActionTypes.FETCH_USERS_RESET:
      return { ...state, data: [], error: null };
    default:
      return state;
  }
};
