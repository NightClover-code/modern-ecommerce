import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type CartDocument = Cart & mongoose.Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' })
  user: User;

}

export const CartSchema = SchemaFactory.createForClass(Cart);
