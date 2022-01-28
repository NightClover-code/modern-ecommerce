import { CartItemInterface } from '../../interfaces';

export interface CartState {
  loading: boolean;
  error: string | null;
  data: { cartItems: CartItemInterface[] };
}
