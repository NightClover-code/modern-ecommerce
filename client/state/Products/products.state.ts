import { ProductInterface } from '../../interfaces';

export interface ProductsState {
  loading: boolean;
  error: string | null;
  products: ProductInterface[];
}

export interface ProductState {
  loading: boolean;
  error: string | null;
  product: ProductInterface;
}
