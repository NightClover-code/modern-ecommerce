import {
  CartInterface,
  CartItemInterface,
  ShippingDetails,
} from '../../interfaces';
import { ActionTypes } from './cart.action-types';

export type CartAction =
  | AddCartItemStart
  | AddCartItemSuccess
  | AddCartItemError
  | GetCartStart
  | GetCartSuccess
  | GetCartError
  | RemoveCartItem
  | SaveCartShippingAddress
  | SaveCartPaymentMethod
  | CalculatePrices;

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

export interface GetCartStart {
  type: ActionTypes.GET_CART_START;
}

export interface GetCartSuccess {
  type: ActionTypes.GET_CART_SUCCESS;
  payload: CartInterface;
}

export interface GetCartError {
  type: ActionTypes.GET_CART_ERROR;
  payload: string;
}

export interface RemoveCartItem {
  type: ActionTypes.REMOVE_CART_ITEM;
  payload: string;
}

export interface SaveCartShippingAddress {
  type: ActionTypes.SAVE_CART_SHIPPING_ADDRESS;
  payload: ShippingDetails;
}

export interface SaveCartPaymentMethod {
  type: ActionTypes.SAVE_CART_PAYMENT_METHOD;
  payload: string;
}

export interface CalculatePrices {
  type: ActionTypes.CALCULATE_PRICES;
  payload: CartInterface;
}
