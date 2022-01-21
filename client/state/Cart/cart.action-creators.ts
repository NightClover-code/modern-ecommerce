import { Dispatch } from 'redux';
import { RootState } from '..';
import { ActionTypes } from './cart.action-types';
import { CartAction } from './cart.actions';

export const addToCart =
  (qty: number) =>
  async (dispatch: Dispatch<CartAction>, getState: () => RootState) => {
    const { _id, name, countInStock, image, price } = getState().product.data;

    dispatch({
      type: ActionTypes.CART_ADD_ITEM,
      payload: {
        productId: _id,
        name,
        countInStock,
        image,
        price,
        qty,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };
