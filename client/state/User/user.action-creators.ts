import { Dispatch } from 'redux';
import { ActionTypes } from './user.action-types';
import { UserAction } from './user.actions';

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({
        type: ActionTypes.USER_LOGIN_START,
      });

      // const {data} = awai t
    } catch (error) {}
  };
