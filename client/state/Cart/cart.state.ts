import { CartItemInterface, ShippingDetails } from '../../interfaces';

export interface CartState {
  loading: boolean;
  error: string | null;
  data: {
    cartItems: CartItemInterface[];
    shippingDetails: ShippingDetails;
  };
}
