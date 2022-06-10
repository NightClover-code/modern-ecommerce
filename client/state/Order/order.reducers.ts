import { ActionTypes } from './order.action-types';
import { OrderAction } from './order.actions';
import { orderInitialState, ordersInitialState } from './order.initial-state';
import { OrdersState, OrderState } from './order.state';

export const orderReducer = (
  state: OrderState = orderInitialState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case ActionTypes.CREATE_ORDER_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case ActionTypes.CREATE_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionTypes.FETCH_ORDER_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_ORDER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case ActionTypes.FETCH_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionTypes.PAY_ORDER_START:
      return { ...state, loading: true, error: null, success: false };
    case ActionTypes.PAY_ORDER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
        success: true,
      };
    case ActionTypes.PAY_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export const userOrdersReducer = (
  state: OrdersState = ordersInitialState,
  action: OrderAction
): OrdersState => {
  switch (action.type) {
    case ActionTypes.FETCH_USER_ORDERS_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_USER_ORDERS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case ActionTypes.FETCH_USER_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ordersReducer = (
  state: OrdersState = ordersInitialState,
  action: OrderAction
): OrdersState => {
  switch (action.type) {
    case ActionTypes.FETCH_ORDERS_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_ORDERS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case ActionTypes.FETCH_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
