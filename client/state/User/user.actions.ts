import { UserInterface } from '../../interfaces';
import { ActionTypes } from './user.action-types';

export type UserAction =
  | UserLoginStart
  | UserLoginError
  | UserLoginSuccess
  | GetCurrentUserStart
  | GetCurrentUserSuccess
  | GetCurrentUserError
  | UserLogout
  | UserRegisterStart
  | UserRegisterSuccess
  | UserRegisterError
  | UserUpdateStart
  | UserUpdateSuccess
  | UserUpdateError
  | UserUpdateReset
  | FetchUsersStart
  | FetchUsersSuccess
  | FetchUsersError
  | FetchUsersReset
  | DeleteUserStart
  | DeleteUserSuccess
  | DeleteUserError
  | FetchUserStart
  | FetchUserSuccess
  | FetchUserError
  | UserReset
  | AdminUpdateUserStart
  | AdminUpdateUserSuccess
  | AdminUpdateUserError
  | AdminUpdateUserReset;

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

export interface UserRegisterStart {
  type: ActionTypes.USER_REGISTER_START;
}

export interface UserRegisterSuccess {
  type: ActionTypes.USER_REGISTER_SUCCESS;
  payload: UserInterface;
}

export interface UserRegisterError {
  type: ActionTypes.USER_REGISTER_ERROR;
  payload: string;
}

export interface UserUpdateStart {
  type: ActionTypes.USER_UPDATE_START;
}

export interface UserUpdateSuccess {
  type: ActionTypes.USER_UPDATE_SUCCESS;
  payload: UserInterface;
}

export interface UserUpdateError {
  type: ActionTypes.USER_UPDATE_ERROR;
  payload: string;
}

export interface UserUpdateReset {
  type: ActionTypes.USER_UPDATE_RESET;
}

export interface AdminUpdateUserStart {
  type: ActionTypes.ADMIN_UPDATE_USER_START;
}

export interface AdminUpdateUserSuccess {
  type: ActionTypes.ADMIN_UPDATE_USER_SUCCESS;
  payload: UserInterface;
}

export interface AdminUpdateUserError {
  type: ActionTypes.ADMIN_UPDATE_USER_ERROR;
  payload: string;
}

export interface AdminUpdateUserReset {
  type: ActionTypes.ADMIN_UPDATE_USER_RESET;
}

export interface GetCurrentUserStart {
  type: ActionTypes.GET_CURRENT_USER_START;
}

export interface GetCurrentUserSuccess {
  type: ActionTypes.GET_CURRENT_USER_SUCCESS;
  payload: UserInterface;
}

export interface GetCurrentUserError {
  type: ActionTypes.GET_CURRENT_USER_ERROR;
  payload: string;
}

export interface UserLogout {
  type: ActionTypes.USER_LOGOUT;
  payload: null;
}

export interface FetchUsersStart {
  type: ActionTypes.FETCH_USERS_START;
}

export interface FetchUsersSuccess {
  type: ActionTypes.FETCH_USERS_SUCCESS;
  payload: UserInterface[];
}

export interface FetchUsersError {
  type: ActionTypes.FETCH_USERS_ERROR;
  payload: string;
}

export interface FetchUsersReset {
  type: ActionTypes.FETCH_USERS_RESET;
}

export interface FetchUserStart {
  type: ActionTypes.FETCH_USER_START;
}

export interface FetchUserSuccess {
  type: ActionTypes.FETCH_USER_SUCCESS;
  payload: UserInterface;
}

export interface FetchUserError {
  type: ActionTypes.FETCH_USER_ERROR;
  payload: string;
}

export interface DeleteUserStart {
  type: ActionTypes.DELETE_USER_START;
}

export interface DeleteUserSuccess {
  type: ActionTypes.DELETE_USER_SUCCESS;
  payload: null;
}

export interface DeleteUserError {
  type: ActionTypes.DELETE_USER_ERROR;
  payload: string;
}

export interface UserReset {
  type: ActionTypes.USER_RESET;
}
