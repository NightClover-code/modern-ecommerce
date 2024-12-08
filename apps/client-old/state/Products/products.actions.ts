import { PaginatedProducts, ProductInterface } from '../../interfaces';
import { ActionTypes } from './products.action-types';

export type ProductsAction =
  | FetchProductsStart
  | FetchProductsError
  | FetchProductsSuccess
  | FetchTopProductsStart
  | FetchTopProductsError
  | FetchTopProductsSuccess
  | FetchProductStart
  | FetchProductError
  | FetchProductSuccess
  | FetchProductReset
  | DeleteProductStart
  | DeleteProductError
  | DeleteProductSuccess
  | CreateProductStart
  | CreateProductError
  | CreateProductSuccess
  | UpdateProductStart
  | UpdateProductError
  | UpdateProductSuccess
  | UpdateProductReset
  | CreateProductReviewStart
  | CreateProductReviewError
  | CreateProductReviewSuccess
  | CreateProductReviewReset;

export interface FetchProductsStart {
  type: ActionTypes.FETCH_PRODUCTS_START;
}

export interface FetchProductsSuccess {
  type: ActionTypes.FETCH_PRODUCTS_SUCCESS;
  payload: PaginatedProducts;
}

export interface FetchProductsError {
  type: ActionTypes.FETCH_PRODUCTS_ERROR;
  payload: string;
}

export interface FetchTopProductsStart {
  type: ActionTypes.FETCH_TOP_PRODUCTS_START;
}

export interface FetchTopProductsSuccess {
  type: ActionTypes.FETCH_TOP_PRODUCTS_SUCCESS;
  payload: ProductInterface[];
}

export interface FetchTopProductsError {
  type: ActionTypes.FETCH_TOP_PRODUCTS_ERROR;
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

export interface CreateProductStart {
  type: ActionTypes.CREATE_PRODUCT_START;
}

export interface CreateProductSuccess {
  type: ActionTypes.CREATE_PRODUCT_SUCCESS;
  payload: ProductInterface;
}

export interface CreateProductError {
  type: ActionTypes.CREATE_PRODUCT_ERROR;
  payload: string;
}

export interface UpdateProductStart {
  type: ActionTypes.UPDATE_PRODUCT_START;
}

export interface UpdateProductSuccess {
  type: ActionTypes.UPDATE_PRODUCT_SUCCESS;
  payload: ProductInterface;
}

export interface UpdateProductError {
  type: ActionTypes.UPDATE_PRODUCT_ERROR;
  payload: string;
}

export interface UpdateProductReset {
  type: ActionTypes.UPDATE_PRODUCT_RESET;
}

export interface CreateProductReviewStart {
  type: ActionTypes.CREATE_PRODUCT_REVIEW_START;
}

export interface CreateProductReviewSuccess {
  type: ActionTypes.CREATE_PRODUCT_REVIEW_SUCCESS;
  payload: ProductInterface;
}

export interface CreateProductReviewError {
  type: ActionTypes.CREATE_PRODUCT_REVIEW_ERROR;
  payload: string;
}

export interface CreateProductReviewReset {
  type: ActionTypes.CREATE_PRODUCT_REVIEW_RESET;
}
