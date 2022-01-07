import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
