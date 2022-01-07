import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controller/products.controller';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
