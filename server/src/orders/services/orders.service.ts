import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) {}

  async addOrder(
    orderAttrs: Partial<OrderDocument>,
    userId: string
  ): Promise<OrderDocument> {
    const {
      orderItems,
      shippingDetails,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = orderAttrs;

    if (orderItems && orderItems.length < 1)
      throw new BadRequestException('No order items received.');

    const createdOrder = await this.orderModel.create({
      user: userId,
      orderItem: orderItems,
      shippingDetails,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    return createdOrder;
  }

  async getOrders(): Promise<OrderDocument[]> {
    const orders = await this.orderModel.find();

    return orders;
  }
}
