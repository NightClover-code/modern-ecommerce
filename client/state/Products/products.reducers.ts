import { ActionTypes } from './products.action-types';
import { ProductsAction } from './products.actions';
import {
  initialProduct,
  productInitialState,
  productsInitialState,
} from './products.initial-state';
import { ProductsState, ProductState } from './products.state';

export const productsReducer = (
  state: ProductsState = productsInitialState,
  action: ProductsAction
): ProductsState => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCTS_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_PRODUCTS_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case ActionTypes.FETCH_PRODUCTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productReducer = (
  state: ProductState = productInitialState,
  action: ProductsAction
): ProductState => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCT_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_PRODUCT_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case ActionTypes.FETCH_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.FETCH_PRODUCT_RESET:
      return { data: initialProduct, loading: false, error: null };
    default:
      return state;
  }
};

export const productDeleteReducer = (
  state: ProductState = productInitialState,
  action: ProductsAction
): ProductState => {
  switch (action.type) {
    case ActionTypes.DELETE_PRODUCT_START:
      return { ...state, loading: true, error: null, success: false };
    case ActionTypes.DELETE_PRODUCT_SUCCESS:
      return { ...state, loading: false, error: null, success: true };
    case ActionTypes.DELETE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const productCreateReducer = (
  state: ProductState = productInitialState,
  action: ProductsAction
): ProductState => {
  switch (action.type) {
    case ActionTypes.CREATE_PRODUCT_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.CREATE_PRODUCT_SUCCESS:
      return { data: action.payload, loading: false, error: null };
    case ActionTypes.CREATE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const productEditReducer = (
  state: ProductState = productInitialState,
  action: ProductsAction
): ProductState => {
  switch (action.type) {
    case ActionTypes.UPDATE_PRODUCT_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.UPDATE_PRODUCT_SUCCESS:
      return { data: action.payload, loading: false, error: null };
    case ActionTypes.UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionTypes.UPDATE_PRODUCT_RESET:
      return { data: initialProduct, loading: false, error: null };
    default:
      return state;
  }
};

export const productCreateReviewReducer = (
  state: ProductState = productInitialState,
  action: ProductsAction
): ProductState => {
  switch (action.type) {
    case ActionTypes.CREATE_PRODUCT_REVIEW_START:
      return { ...state, loading: true, error: null, success: false };
    case ActionTypes.CREATE_PRODUCT_REVIEW_SUCCESS:
      return {
        data: action.payload,
        loading: false,
        error: null,
        success: true,
      };
    case ActionTypes.CREATE_PRODUCT_REVIEW_ERROR:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      };

    case ActionTypes.CREATE_PRODUCT_REVIEW_RESET:
      return {
        data: initialProduct,
        loading: false,
        error: null,
        success: false,
      };
    default:
      return state;
  }
};
