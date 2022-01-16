import { ProductsState, ProductState } from './products.state';

export const productsInitialState: ProductsState = {
  loading: false,
  error: null,
  products: [],
};

export const productInitialState: ProductState = {
  loading: false,
  error: null,
  product: null,
};
