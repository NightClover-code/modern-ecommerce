import { ActionTypes } from './cart.action-types';
import { CartAction } from './cart.actions';
import { cartInitialState } from './cart.initial-state';
import { CartState } from './cart.state';

export const cartReducer = (
  state: CartState = cartInitialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case ActionTypes.CART_ADD_ITEM:
      const item = action.payload;

      const itemExists = state.cartItems.find(
        x => x.productId === item.productId
      );

      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.productId === itemExists.productId ? item : x
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    default:
      return state;
  }
};
