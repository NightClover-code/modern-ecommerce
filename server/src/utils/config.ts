import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
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

export const configureJWT = (
  configService: ConfigService
): JwtModuleOptions => {
  const jwtSecret = configService.get<string>('JWT_SECRET');

  return {
    secret: jwtSecret,
    signOptions: { expiresIn: '1d' },
  };
};
