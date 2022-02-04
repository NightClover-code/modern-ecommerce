import { CartItem, ShippingDetails } from 'src/interfaces';

export interface CartInterface {
  cartItems: CartItem[];
  shippingDetails: ShippingDetails;
}

export class Cart {
  constructor(
    public cart: CartInterface = {
      cartItems: [],
      shippingDetails: {
        address: '',
        city: '',
        postalCode: '',
        country: '',
      },
    }
  ) {}
}
