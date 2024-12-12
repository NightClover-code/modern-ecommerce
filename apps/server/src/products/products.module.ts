import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controller/products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { AppService } from '@/app/services/app.service';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    CloudinaryModule,
  ],
  providers: [ProductsService, AppService],
  controllers: [ProductsController],
})
export class ProductsModule {}
