import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) {}

  addOrder(order: Partial<OrderDocument>) {
    const {
      orderItems,
      // shippingDetails,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = order;

    if (orderItems && orderItems.length < 1)
      throw new BadRequestException('No order items received.');

    // const order = this.orderModel.create();
  }
}
