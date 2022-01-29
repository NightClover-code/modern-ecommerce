import { CartItemInterface } from '../../interfaces';
import { ActionTypes } from './cart.action-types';

export type CartAction =
  | AddCartItemStart
  | AddCartItemSuccess
  | AddCartItemError
  | GetCartItemsStart
  | GetCartItemsSuccess
  | GetCartItemsError
  | RemoveCartItem;

export interface AddCartItemStart {
  type: ActionTypes.ADD_CART_ITEM_START;
}

export interface AddCartItemSuccess {
  type: ActionTypes.ADD_CART_ITEM_SUCCESS;
  payload: CartItemInterface;
}

export interface AddCartItemError {
  type: ActionTypes.ADD_CART_ITEM_ERROR;
  payload: string;
}

export interface GetCartItemsStart {
  type: ActionTypes.GET_CART_ITEMS_START;
}

export interface GetCartItemsSuccess {
  type: ActionTypes.GET_CART_ITEMS_SUCCESS;
  payload: CartItemInterface[];
}

export interface GetCartItemsError {
  type: ActionTypes.GET_CART_ITEMS_ERROR;
  payload: string;
}

export interface RemoveCartItem {
  type: ActionTypes.REMOVE_CART_ITEM;
  payload: string;
}
