import { CartItemInterface } from '../../interfaces';
import { ActionTypes } from './cart.action-types';

export type CartAction = CartAddItem | CartRemoveItem | GetCartItems;

export interface CartAddItem {
  type: ActionTypes.CART_ADD_ITEM;
  payload: CartItemInterface;
}

export interface CartRemoveItem {
  type: ActionTypes.CART_REMOVE_ITEM;
  payload: string;
}

export interface GetCartItems {
  type: ActionTypes.GET_CART_ITEMS;
  payload: CartItemInterface[];
}
