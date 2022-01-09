import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { connectDB } from 'src/config/db';
import { ProductsModule } from 'src/products/products.module';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: connectDB,
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
