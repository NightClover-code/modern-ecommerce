import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

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

export const corsConfig = () => ({
  origin: process.env.CLIENT_URL,
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  credentials: true,
});

export const sessionConfig = (MongoDBStore: any) => ({
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
});
