import { Dispatch } from 'redux';
import { ProductInterface } from '../../interfaces';
import { productsAPI } from '../../lib';
import { ActionTypes } from './cart.action-types';
import { CartAction } from './cart.actions';

interface AddToCart {
  qty: number;
  productId?: string;
  product?: ProductInterface;
}

export const addToCart =
  ({ qty, productId, product }: AddToCart) =>
  async (dispatch: Dispatch<CartAction>) => {
    const { data } = await productsAPI.post(
      '/cart',
      {
        product,
        qty,
        productId,
      },
      { withCredentials: true }
    );

    dispatch({
      type: ActionTypes.CART_ADD_ITEM,
      payload: data,
    });
  };

export const getCartItems = () => async (dispatch: Dispatch<CartAction>) => {
  const { data } = await productsAPI.get('/cart', { withCredentials: true });

  dispatch({
    type: ActionTypes.GET_CART_ITEMS,
    payload: data,
  });
};
