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
  reviews: [],
};

export const productsInitialState: ProductsState = {
  loading: false,
  error: null,
  data: {
    products: [],
    page: 1,
    pages: 1,
  },
};

export const productInitialState: ProductState = {
  loading: false,
  error: null,
  data: initialProduct,
};
