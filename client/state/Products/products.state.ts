import { ProductInterface } from '../../interfaces';

export interface ProductsState {
  loading: boolean;
  error: string | null;
  data: ProductInterface[];
}

export interface ProductState {
  loading: boolean;
  error: string | null;
  data: ProductInterface;
  success?: boolean;
}
