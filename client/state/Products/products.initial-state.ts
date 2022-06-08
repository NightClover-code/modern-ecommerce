import { ProductsState, ProductState } from './products.state';

export const initialProduct = {
  _id: '',
  name: '',
  image: '',
  description: '',
  brand: '',
  category: '',
  price: 0,
  countInStock: 0,
  rating: 0,
  numReviews: 0,
};

export const productsInitialState: ProductsState = {
  loading: false,
  error: null,
  data: [],
};

export const productInitialState: ProductState = {
  loading: false,
  error: null,
  data: initialProduct,
};
