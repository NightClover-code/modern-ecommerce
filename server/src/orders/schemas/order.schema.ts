import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { OrderItem, PaymentResult, ShippingDetails } from 'src/interfaces';
import { User } from 'src/users/schemas/user.schema';

export type OrderDocument = Order & mongoose.Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  user: User;

  @Prop({
    required: true,
    type: [
      {
        name: { required: true, type: String },
        qty: { required: true, type: Number },
        image: { required: true, type: String },
        price: { required: true, type: Number },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
  })
  orderItems: OrderItem[];

  @Prop({
    required: true,
    type: {
      address: { required: true, type: String },
      city: { required: true, type: String },
      postalCode: { required: true, type: String },
      country: { required: true, type: String },
    },
  })
  shippingDetails: ShippingDetails;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({
    required: false,
    type: {
      id: { required: true, type: String },
      status: { required: true, type: String },
      update_time: { required: true, type: String },
      email_address: { required: true, type: String },
    },
  })
  paymentResult: PaymentResult;

  @Prop({ required: true, default: 0.0 })
  taxPrice: number;

  @Prop({ required: true, default: 0.0 })
  shippingPrice: number;

  @Prop({ required: true, default: 0.0 })
  itemsPrice: number;

  @Prop({ required: true, default: 0.0 })
  totalPrice: number;

  @Prop({ default: false })
  isPaid: boolean;

  @Prop({ required: false })
  paidAt: string;

  @Prop({ default: false })
  isDelivered: boolean;

  @Prop({ required: false })
  deliveredAt: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
