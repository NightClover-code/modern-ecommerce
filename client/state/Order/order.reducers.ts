import { ActionTypes } from './order.action-types';
import { OrderAction } from './order.actions';
import { orderInitialState } from './order.initial-state';
import { OrderState } from './order.state';

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
    default:
      return state;
  }
};
