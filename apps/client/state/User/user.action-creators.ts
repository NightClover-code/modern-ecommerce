import Router from 'next/router';
import { Dispatch } from 'redux';
import { UserCredentials, UserEditCredentials } from '../../interfaces';
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

      dispatch({
        type: ActionTypes.GET_CURRENT_USER_SUCCESS,
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
      dispatch({
        type: ActionTypes.GET_CURRENT_USER_START,
      });

      const { data } = await proshopAPI.get('/auth/profile', config);

      dispatch({
        type: ActionTypes.GET_CURRENT_USER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.GET_CURRENT_USER_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const logout = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    await proshopAPI.post('/auth/logout', {}, { withCredentials: true });

    dispatch({
      type: ActionTypes.USER_LOGOUT,
      payload: null,
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

export const updateUser =
  (userCredentials: Partial<UserCredentials>) =>
  async (dispatch: Dispatch<UserAction>) => {
    const config = {
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.USER_UPDATE_START,
      });

      const { data } = await proshopAPI.put(
        '/auth/profile',
        userCredentials,
        config
      );

      dispatch({
        type: ActionTypes.USER_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: ActionTypes.GET_CURRENT_USER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.USER_UPDATE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const fetchUsers = () => async (dispatch: Dispatch<UserAction>) => {
  const config = {
    withCredentials: true,
  };

  try {
    dispatch({
      type: ActionTypes.FETCH_USERS_START,
    });

    const { data } = await proshopAPI.get('/users', config);

    dispatch({
      type: ActionTypes.FETCH_USERS_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ActionTypes.FETCH_USERS_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const deleteUser =
  (id: string) => async (dispatch: Dispatch<UserAction>) => {
    const config = {
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.DELETE_USER_START,
      });

      await proshopAPI.delete(`/users/${id}`, config);

      dispatch({
        type: ActionTypes.DELETE_USER_SUCCESS,
        payload: null,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.DELETE_USER_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const fetchUser =
  (id: string) => async (dispatch: Dispatch<UserAction>) => {
    const config = {
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.FETCH_USER_START,
      });

      const { data } = await proshopAPI.get(`/users/${id}`, config);

      dispatch({
        type: ActionTypes.FETCH_USER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.FETCH_USER_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const adminUpdateUser =
  (id: string, userCredentials: UserEditCredentials) =>
  async (dispatch: Dispatch<UserAction>) => {
    const config = {
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.ADMIN_UPDATE_USER_START,
      });

      const { data } = await proshopAPI.put(
        `/users/${id}`,
        userCredentials,
        config
      );

      dispatch({
        type: ActionTypes.ADMIN_UPDATE_USER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: ActionTypes.ADMIN_UPDATE_USER_RESET,
      });

      Router.push('/admin/users');
    } catch (error: any) {
      dispatch({
        type: ActionTypes.ADMIN_UPDATE_USER_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const userReset = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch({
    type: ActionTypes.USER_RESET,
  });
};

export const fetchUsersReset = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch({
    type: ActionTypes.FETCH_USERS_RESET,
  });
};

export const updateUserReset = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch({
    type: ActionTypes.USER_UPDATE_RESET,
  });
};
