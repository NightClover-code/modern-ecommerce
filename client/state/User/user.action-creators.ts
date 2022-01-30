import Router from 'next/router';
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

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await proshopAPI.post(
        '/auth/login',
        {
          email,
          password,
        },
        config
      );

      dispatch({
        type: ActionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });

      Router.push('/');
    } catch (error: any) {
      dispatch({
        type: ActionTypes.USER_LOGIN_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const getCurrentUser = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    const { data } = await proshopAPI.get('/auth/profile', {
      withCredentials: true,
    });

    dispatch({
      type: ActionTypes.GET_CURRENT_USER,
      payload: data,
    });
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};
