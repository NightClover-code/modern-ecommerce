import { OrderInterface } from '../../interfaces';

export interface OrderState {
  loading: boolean;
  error: string | null;
  data: OrderInterface;
  success?: boolean;
}

export interface OrdersState {
  loading: boolean;
  error: string | null;
  data: OrderInterface[];
}
