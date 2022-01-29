import { ActionTypes } from './cart.action-types';
import { CartAction } from './cart.actions';
import { cartInitialState } from './cart.initial-state';
import { CartState } from './cart.state';

export const cartReducer = (
  state: CartState = cartInitialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case ActionTypes.ADD_CART_ITEM_START:
      return { ...state, loading: true };
    case ActionTypes.ADD_CART_ITEM_SUCCESS:
      const item = action.payload;

      const itemExists = state.data.cartItems.find(
        x => x.productId === item.productId
      );

      if (itemExists) {
        return {
          ...state,
          data: {
            cartItems: state.data.cartItems.map(x =>
              x.productId === itemExists.productId ? item : x
            ),
          },
        };
      }

      return {
        ...state,
        loading: false,
        data: { cartItems: [...state.data.cartItems, item] },
      };
    case ActionTypes.ADD_CART_ITEM_ERROR:
      return { ...state, error: action.payload };

    case ActionTypes.GET_CART_ITEMS_START:
      return { ...state, loading: true };
    case ActionTypes.GET_CART_ITEMS_SUCCESS:
      return { ...state, loading: false, data: { cartItems: action.payload } };
    case ActionTypes.GET_CART_ITEMS_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
