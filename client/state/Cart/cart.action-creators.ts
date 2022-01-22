import { Dispatch } from 'redux';
import { RootState } from '..';
import { productsAPI } from '../../lib';
import { ActionTypes } from './cart.action-types';
import { CartAction } from './cart.actions';

export const addToCart =
  (productId: string, qty: number) =>
  async (dispatch: Dispatch<CartAction>, getState: () => RootState) => {
    const { data } = await productsAPI.get(`/products/${productId}`);

    const { _id, name, countInStock, image, price } = data;

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
