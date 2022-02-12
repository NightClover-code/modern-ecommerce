import { Module } from '@nestjs/common';
import { OrdersController } from './controller/orders.controller';
import { OrderService } from './services/orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrderService],
})
export class OrderModule {}
