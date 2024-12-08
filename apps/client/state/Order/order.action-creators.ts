import { Dispatch } from 'redux';
import { OrderInterface, PaymentResult } from '../../interfaces';
import { proshopAPI } from '../../lib';
import { ActionTypes } from './order.action-types';
import { OrderAction } from './order.actions';
import Router from 'next/router';

export const createOrder =
  (order: OrderInterface) => async (dispatch: Dispatch<OrderAction>) => {
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

      Router.push(`/orders/${data._id}`);
    } catch (error: any) {
      dispatch({
        type: ActionTypes.CREATE_ORDER_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const fetchOrder =
  (id: string) => async (dispatch: Dispatch<OrderAction>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.FETCH_ORDER_START,
      });

      const { data } = await proshopAPI.get(`/orders/${id}`, config);

      dispatch({
        type: ActionTypes.FETCH_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.FETCH_ORDER_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const fetchOrders = () => async (dispatch: Dispatch<OrderAction>) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  try {
    dispatch({
      type: ActionTypes.FETCH_ORDERS_START,
    });

    const { data } = await proshopAPI.get('/orders', config);

    dispatch({
      type: ActionTypes.FETCH_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ActionTypes.FETCH_ORDERS_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const payOrder =
  (orderId: string, paymentResult: PaymentResult) =>
  async (dispatch: Dispatch<OrderAction>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.PAY_ORDER_START,
      });

      const { data } = await proshopAPI.put(
        `/orders/${orderId}/pay`,
        {
          paymentResult,
        },
        config
      );

      dispatch({
        type: ActionTypes.PAY_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.PAY_ORDER_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const fetchUserOrders =
  () => async (dispatch: Dispatch<OrderAction>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.FETCH_USER_ORDERS_START,
      });

      const { data } = await proshopAPI.get(`/orders/myorders`, config);

      dispatch({
        type: ActionTypes.FETCH_USER_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.FETCH_USER_ORDERS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const deliverOrder =
  (orderId: string) =>
  async (dispatch: Dispatch<OrderAction>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.DELIVER_ORDER_START,
      });

      const { data } = await proshopAPI.put(
        `/orders/${orderId}/deliver`,
        {},
        config
      );

      dispatch({
        type: ActionTypes.DELIVER_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.DELIVER_ORDER_ERROR,
        payload: error.response.data.message,
      });
    }
  };
