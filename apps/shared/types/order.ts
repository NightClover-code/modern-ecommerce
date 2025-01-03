import { ShippingDetails, PaymentResult } from './shipping';
import { User } from '.';
export interface OrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  productId: string;
}

export interface Order {
  _id: string;
  user: User;
  orderItems: OrderItem[];
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}
