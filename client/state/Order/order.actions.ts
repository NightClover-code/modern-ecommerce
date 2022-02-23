import { OrderInterface } from '../../interfaces';
import { ActionTypes } from './order.action-types';

export type OrderAction =
  | CreateOrderStart
  | CreateOrderSuccess
  | CreateOrderError
  | FetchOrderStart
  | FetchOrderSuccess
  | FetchOrderError
  | PayOrderStart
  | PayOrderSuccess
  | PayOrderError;

export interface CreateOrderStart {
  type: ActionTypes.CREATE_ORDER_START;
}

export interface CreateOrderSuccess {
  type: ActionTypes.CREATE_ORDER_SUCCESS;
  payload: OrderInterface;
}

export interface CreateOrderError {
  type: ActionTypes.CREATE_ORDER_ERROR;
  payload: string;
}

export interface FetchOrderStart {
  type: ActionTypes.FETCH_ORDER_START;
}

export interface FetchOrderSuccess {
  type: ActionTypes.FETCH_ORDER_SUCCESS;
  payload: OrderInterface;
}

export interface FetchOrderError {
  type: ActionTypes.FETCH_ORDER_ERROR;
  payload: string;
}

export interface PayOrderStart {
  type: ActionTypes.PAY_ORDER_START;
}

export interface PayOrderSuccess {
  type: ActionTypes.PAY_ORDER_SUCCESS;
  payload: OrderInterface;
}

export interface PayOrderError {
  type: ActionTypes.PAY_ORDER_ERROR;
  payload: string;
}
