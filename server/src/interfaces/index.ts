import { Product } from 'src/products/schemas/product.schema';

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: Product;
}

export interface PaymentResult {
  id: string;
  status: string;
  updateTime: string;
  emailAddress: string;
}
