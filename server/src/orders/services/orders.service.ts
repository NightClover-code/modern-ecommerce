import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaymentResult } from 'src/interfaces';
import { Order, OrderDocument } from '../schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) {}

  async create(
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
      orderItems,
      shippingDetails,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    return createdOrder;
  }

  async findAll(): Promise<OrderDocument[]> {
    const orders = await this.orderModel.find();

    return orders;
  }

  async findById(id: string): Promise<OrderDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid order ID.');

    const order = await this.orderModel
      .findById(id)
      .populate('user', 'name email');

    if (!order) throw new NotFoundException('No order with given ID.');

    return order;
  }

  async updatePaid(
    id: string,
    paymentResult: PaymentResult
  ): Promise<OrderDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid order ID.');

    const order = await this.orderModel.findById(id);

    if (!order) throw new NotFoundException('No order with given ID.');

    order.isPaid = true;
    order.paidAt = Date();
    order.paymentResult = paymentResult;

    const updatedOrder = await order.save();

    return updatedOrder;
  }

  async updateDelivered(id: string): Promise<OrderDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid order ID.');

    const order = await this.orderModel.findById(id);

    if (!order) throw new NotFoundException('No order with given ID.');

    order.isDelivered = true;
    order.deliveredAt = Date();

    const updatedOrder = await order.save();

    return updatedOrder;
  }

  async findUserOrders(userId: string) {
    const orders = await this.orderModel.find({ user: userId });

    return orders;
  }
}
