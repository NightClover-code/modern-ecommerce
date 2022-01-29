import { Dispatch } from 'redux';
import { ProductInterface } from '../../interfaces';
import { productsAPI } from '../../lib';
import { ActionTypes } from './cart.action-types';
import { CartAction } from './cart.actions';
import Router from 'next/router';

interface AddToCart {
  qty: number;
  productId?: string;
  product?: ProductInterface;
}

export const addToCart =
  ({ qty, productId, product }: AddToCart) =>
  async (dispatch: Dispatch<CartAction>) => {
    try {
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
        type: ActionTypes.ADD_CART_ITEM,
        payload: data,
      });

      Router.push('/cart');
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const getCartItems = () => async (dispatch: Dispatch<CartAction>) => {
  try {
    const { data } = await productsAPI.get('/cart', { withCredentials: true });

    dispatch({
      type: ActionTypes.GET_CART_ITEMS,
      payload: data,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
