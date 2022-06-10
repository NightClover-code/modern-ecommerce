import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { connectDB } from './utils/config';
import { ProductsModule } from './products/products.module';
import { UsersModule } from 'src/users/users.module';
import { CommandModule } from 'nestjs-command';
import { CartModule } from 'src/cart/cart.module';
import { OrderModule } from './orders/order.module';
// import { SeedsModule } from './seeds/seeds.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: connectDB,
    }),
    CommandModule,
    ProductsModule,
    UsersModule,
    CartModule,
    OrderModule,
    // SeedsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
