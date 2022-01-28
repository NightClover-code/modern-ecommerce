import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

const MongoDBStore = require('connect-mongodb-session')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    credentials: true,
  });
  app.use(
    session({
      secret: process.env.SESSION_KEY,
      resave: false,
      saveUninitialized: false,
      store: new MongoDBStore({
        uri: process.env.MONGODB_URL,
        collection: 'sessions',
      }),
      cookie: {
        maxAge: 180 * 60 * 1000,
      },
    })
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
