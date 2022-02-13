import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createOrder(@Body() body: any, @Session() session: any) {
    const order = await this.ordersService.addOrder(body, session.user._id);

    return order;
  }

  @Get()
  async getOrders() {
    const orders = await this.ordersService.getOrders();

    return orders;
  }
}
