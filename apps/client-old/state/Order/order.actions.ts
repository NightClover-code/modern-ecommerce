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
  | PayOrderError
  | DeliverOrderStart
  | DeliverOrderSuccess
  | DeliverOrderError
  | FetchUserOrdersStart
  | FetchUserOrdersSuccess
  | FetchUserOrdersError
  | FetchOrdersStart
  | FetchOrdersSuccess
  | FetchOrdersError;

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

export interface FetchOrdersStart {
  type: ActionTypes.FETCH_ORDERS_START;
}

export interface FetchOrdersSuccess {
  type: ActionTypes.FETCH_ORDERS_SUCCESS;
  payload: OrderInterface[];
}

export interface FetchOrdersError {
  type: ActionTypes.FETCH_ORDERS_ERROR;
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

export interface DeliverOrderStart {
  type: ActionTypes.DELIVER_ORDER_START;
}

export interface DeliverOrderSuccess {
  type: ActionTypes.DELIVER_ORDER_SUCCESS;
  payload: OrderInterface;
}

export interface DeliverOrderError {
  type: ActionTypes.DELIVER_ORDER_ERROR;
  payload: string;
}

export interface FetchUserOrdersStart {
  type: ActionTypes.FETCH_USER_ORDERS_START;
}

export interface FetchUserOrdersSuccess {
  type: ActionTypes.FETCH_USER_ORDERS_SUCCESS;
  payload: OrderInterface[];
}

export interface FetchUserOrdersError {
  type: ActionTypes.FETCH_USER_ORDERS_ERROR;
  payload: string;
}
