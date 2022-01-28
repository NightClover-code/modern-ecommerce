import { ActionTypes } from './cart.action-types';
import { CartAction } from './cart.actions';
import { cartInitialState } from './cart.initial-state';
import { CartState } from './cart.state';

export const cartReducer = (
  state: CartState = cartInitialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case ActionTypes.GET_CART_ITEMS:
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
};
