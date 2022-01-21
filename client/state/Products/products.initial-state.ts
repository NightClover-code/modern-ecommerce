import { ProductsState, ProductState } from './products.state';

const product = {
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
  products: [],
};

export const productInitialState: ProductState = {
  loading: false,
  error: null,
  product,
};
