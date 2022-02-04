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
      return { ...state, loading: true, error: null };
    case ActionTypes.ADD_CART_ITEM_SUCCESS:
      const item = action.payload;

      const itemExists = state.data.cartItems.find(
        x => x.productId === item.productId
      );

      if (itemExists) {
        return {
          ...state,
          loading: false,
          data: {
            ...state.data,
            cartItems: state.data.cartItems.map(x =>
              x.productId === itemExists.productId ? item : x
            ),
          },
        };
      }

      return {
        loading: false,
        data: { ...state.data, cartItems: [...state.data.cartItems, item] },
        error: null,
      };
    case ActionTypes.ADD_CART_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        data: {
          ...state.data,
          cartItems: state.data.cartItems.filter(
            x => x.productId !== action.payload
          ),
        },
      };

    case ActionTypes.SAVE_CART_SHIPPING_ADDRESS:
      return {
        ...state,
        data: {
          ...state.data,
          shippingDetails: action.payload,
        },
      };

    case ActionTypes.GET_CART_ITEMS_START:
      return { ...state, loading: true };
    case ActionTypes.GET_CART_ITEMS_SUCCESS:
      return {
        loading: false,
        data: { ...state.data, cartItems: action.payload },
        error: null,
      };
    case ActionTypes.GET_CART_ITEMS_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
