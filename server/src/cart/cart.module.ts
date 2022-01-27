import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';

@Module({
  providers: [CartService],
})
export class CartModule {}
