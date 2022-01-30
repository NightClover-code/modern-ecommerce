import { UserInterface } from '../../interfaces';
import { ActionTypes } from './user.action-types';

export type UserAction =
  | UserLoginStart
  | UserLoginError
  | UserLoginSuccess
  | GetCurrentUser
  | UserLogout;

export interface UserLoginStart {
  type: ActionTypes.USER_LOGIN_START;
}

export interface UserLoginSuccess {
  type: ActionTypes.USER_LOGIN_SUCCESS;
  payload: UserInterface;
}

export interface UserLoginError {
  type: ActionTypes.USER_LOGIN_ERROR;
  payload: string;
}

export interface GetCurrentUser {
  type: ActionTypes.GET_CURRENT_USER;
  payload: UserInterface;
}

export interface UserLogout {
  type: ActionTypes.USER_LOGOUT;
  payload: null;
}
