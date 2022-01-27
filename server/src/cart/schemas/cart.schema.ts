export interface CartInterface {
  cartItems: CartItem[];
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export class Cart {
  constructor(public cart: CartInterface = { cartItems: [] }) {}
}
