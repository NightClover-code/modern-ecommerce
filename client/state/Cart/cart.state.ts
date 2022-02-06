import { CartInterface } from '../../interfaces';

export interface CartState {
  loading: boolean;
  error: string | null;
  data: CartInterface;
}
