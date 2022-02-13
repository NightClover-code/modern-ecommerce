import { Dispatch } from 'redux';
import { OrderInterface } from '../../interfaces';
import { proshopAPI } from '../../lib';
import { ActionTypes } from './order.action-types';
import { OrdersAction } from './order.actions';

export const createOrder =
  (order: OrderInterface) => async (dispatch: Dispatch<OrdersAction>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.CREATE_ORDER_START,
      });

      const { data } = await proshopAPI.post('/orders', order, config);

      dispatch({
        type: ActionTypes.CREATE_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.CREATE_ORDER_ERROR,
        payload: error.response.data.message,
      });
    }
  };
