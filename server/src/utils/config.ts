import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { SessionOptions } from 'express-session';

export const connectDB = (
  configService: ConfigService
): MongooseModuleOptions => {
  const dbPassword = configService.get<string>('MONGODB_PASSWORD');
  const dbName = configService.get<string>('MONGODB_DATABASE_NAME');

  const mongodbUri = `mongodb+srv://achrafdev:${dbPassword}@proshop.rbkt6.mongodb.net/${dbName}?retryWrites=true&w=majority`;

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
  store: new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: 'sessions',
  }),
  cookie: {
    sameSite: 'none',
    secure: true,
    domain: 'modern-ecommerce-pi.vercel.app',
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  },
});
