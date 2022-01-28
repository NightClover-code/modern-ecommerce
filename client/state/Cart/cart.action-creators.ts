import { Dispatch } from 'redux';
import { RootState } from '..';
import { ProductInterface } from '../../interfaces';
import { productsAPI } from '../../lib';
import { ActionTypes } from './cart.action-types';
import { CartAction } from './cart.actions';

export const addToCart =
  (product: ProductInterface, qty: number) =>
  async (dispatch: Dispatch<CartAction>, getState: () => RootState) => {
    const res = await productsAPI.post(
      '/cart',
      {
        product,
        qty,
      },
      { withCredentials: true }
    );

    console.log(res);

    // const { data } = await productsAPI.get('/cart', {
    //   headers: {
    //     // 'Set-Cookie':
    //   },
    // });

    // console.log(data);

    // const { _id, name, countInStock, image, price } = data;

    // dispatch({
    //   type: ActionTypes.CART_ADD_ITEM,
    //   payload: {
    //     productId: _id,
    //     name,
    //     countInStock,
    //     image,
    //     price,
    //     qty,
    //   },
    // });

    // localStorage.setItem(
    //   'cartItems',
    //   JSON.stringify(getState().cart.cartItems)
    // );
  };
