import Router from 'next/router';
import { Dispatch } from 'redux';
import { proshopAPI } from '../../lib';
import { ActionTypes } from './user.action-types';
import { UserAction } from './user.actions';

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<UserAction>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.USER_LOGIN_START,
      });

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

      localStorage.setItem('accessToken', data.accessToken);

      Router.push('/');
    } catch (error: any) {
      dispatch({
        type: ActionTypes.USER_LOGIN_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const getCurrentUser =
  (accessToken: string) => async (dispatch: Dispatch<UserAction>) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };

    try {
      const { data } = await proshopAPI.get('/auth/profile', config);

      dispatch({
        type: ActionTypes.GET_CURRENT_USER,
        payload: data,
      });
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

export const logout = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    const { data } = await proshopAPI.post(
      '/auth/logout',
      {},
      { withCredentials: true }
    );

    dispatch({
      type: ActionTypes.USER_LOGOUT,
      payload: data,
    });
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch<UserAction>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.USER_REGISTER_START,
      });

      const { data } = await proshopAPI.post(
        '/auth/register',
        {
          name,
          email,
          password,
        },
        config
      );

      dispatch({
        type: ActionTypes.USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: ActionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('accessToken', data.accessToken);

      Router.push('/');
    } catch (error: any) {
      dispatch({
        type: ActionTypes.USER_REGISTER_ERROR,
        payload: error.response.data.message,
      });
    }
  };
