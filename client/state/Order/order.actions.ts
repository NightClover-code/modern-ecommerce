import { ActionTypes } from './order.action-types';

export type OrdersAction = CreateOrderStart;

export interface CreateOrderStart {
  type: ActionTypes.CREATE_ORDER_START;
}
