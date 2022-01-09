import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';

export type OrderDocument = Order & mongoose.Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' })
  user: User;

  @Prop({
    required: true,
    type: [
      {
        name: { required: true },
        qty: { required: true },
        image: { required: true },
        price: { required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
  })
  orderItems: {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: Product;
  }[];

  @Prop({
    required: true,
    type: {
      address: { required: true },
      city: { required: true },
      postalCode: { required: true },
      country: { required: true },
    },
  })
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  paymentResult: {
    id: string;
    status: string;
    updateTime: string;
    emailAddress: string;
  };

  @Prop({ required: true, default: 0.0 })
  taxPrice: number;

  @Prop({ required: true, default: 0.0 })
  shippingPrice: number;

  @Prop({ required: true, default: 0.0 })
  totalPrice: number;

  @Prop({ required: true, default: false })
  isPaid: boolean;

  @Prop({ required: true })
  paidAt: Date;

  @Prop({ required: true, default: false })
  isDelivered: boolean;

  @Prop({ required: true })
  deliveredAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
