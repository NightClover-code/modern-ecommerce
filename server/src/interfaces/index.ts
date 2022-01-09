import { Product } from 'src/products/schemas/product.schema';

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderItems {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: Product;
}

export interface PaymentResult {}
