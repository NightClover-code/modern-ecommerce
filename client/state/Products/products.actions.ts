import { ProductInterface } from '../../interfaces';
import { ActionType } from './products.action-types';

export type ProductsAction =
  | FetchProductsStart
  | FetchProductsError
  | FetchProductsSuccess
  | FetchProductStart
  | FetchProductError
  | FetchProductSuccess;

export interface FetchProductsStart {
  type: ActionType.FETCH_PRODUCTS_START;
}

export interface FetchProductsSuccess {
  type: ActionType.FETCH_PRODUCTS_SUCCESS;
  payload: ProductInterface[];
}

export interface FetchProductsError {
  type: ActionType.FETCH_PRODUCTS_ERROR;
  payload: string;
}

export interface FetchProductStart {
  type: ActionType.FETCH_PRODUCT_START;
}

export interface FetchProductSuccess {
  type: ActionType.FETCH_PRODUCT_SUCCESS;
  payload: ProductInterface;
}

export interface FetchProductError {
  type: ActionType.FETCH_PRODUCT_ERROR;
  payload: string;
}
