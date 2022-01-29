import { Dispatch } from 'redux';
import { proshopAPI } from '../../lib';
import { ActionTypes } from './user.action-types';
import { UserAction } from './user.actions';

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({
        type: ActionTypes.USER_LOGIN_START,
      });

      const { data } = await proshopAPI.post('/auth/login', {
        email,
        password,
      });

      dispatch({
        type: ActionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.USER_LOGIN_ERROR,
        payload: error.message,
      });
    }
  };
