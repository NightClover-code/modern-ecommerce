import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { SessionOptions } from 'express-session';

export const connectDB = (
  configService: ConfigService
): MongooseModuleOptions => {
  const mongodbUri = configService.get<string>('MONGODB_URL');

  return {
    uri: mongodbUri,
    autoIndex: false,
  };
};

export const corsConfig = (): CorsOptions => ({
  origin: process.env.CLIENT_URL,
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  credentials: true,
});

export const sessionConfig = (MongoDBStore: any): SessionOptions => ({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie:
    process.env.NODE_ENV === 'production'
      ? {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          maxAge: 3 * 24 * 60 * 60 * 1000,
        }
      : { maxAge: 3 * 24 * 60 * 60 * 1000 },
  store: new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: 'sessions',
  }),
});
