import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { CartItem, ShippingDetails } from '../../interfaces';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId!: User;

  @Prop([
    {
      productId: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      countInStock: { type: Number, required: true },
      qty: { type: Number, required: true },
    },
  ])
  items!: CartItem[];

  @Prop({
    type: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    required: false,
  })
  shippingDetails?: ShippingDetails;

  @Prop({ default: 'PayPal' })
  paymentMethod!: string;

  @Prop({ default: 0 })
  itemsPrice!: number;

  @Prop({ default: 0 })
  taxPrice!: number;

  @Prop({ default: 0 })
  shippingPrice!: number;

  @Prop({ default: 0 })
  totalPrice!: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
