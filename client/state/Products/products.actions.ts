import { ProductInterface } from '../../interfaces';
import { ActionTypes } from './products.action-types';

export type ProductsAction =
  | FetchProductsStart
  | FetchProductsError
  | FetchProductsSuccess
  | FetchProductStart
  | FetchProductError
  | FetchProductSuccess
  | FetchProductReset
  | DeleteProductStart
  | DeleteProductError
  | DeleteProductSuccess;

export interface FetchProductsStart {
  type: ActionTypes.FETCH_PRODUCTS_START;
}

export interface FetchProductsSuccess {
  type: ActionTypes.FETCH_PRODUCTS_SUCCESS;
  payload: ProductInterface[];
}

export interface FetchProductsError {
  type: ActionTypes.FETCH_PRODUCTS_ERROR;
  payload: string;
}

export interface FetchProductStart {
  type: ActionTypes.FETCH_PRODUCT_START;
}

export interface FetchProductSuccess {
  type: ActionTypes.FETCH_PRODUCT_SUCCESS;
  payload: ProductInterface;
}

export interface FetchProductError {
  type: ActionTypes.FETCH_PRODUCT_ERROR;
  payload: string;
}

export interface FetchProductReset {
  type: ActionTypes.FETCH_PRODUCT_RESET;
}

export interface DeleteProductStart {
  type: ActionTypes.DELETE_PRODUCT_START;
}

export interface DeleteProductSuccess {
  type: ActionTypes.DELETE_PRODUCT_SUCCESS;
  payload: null;
}

export interface DeleteProductError {
  type: ActionTypes.DELETE_PRODUCT_ERROR;
  payload: string;
}
