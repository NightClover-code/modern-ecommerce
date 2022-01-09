import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const connectDB = async (
  configService: ConfigService
): Promise<MongooseModuleOptions> => {
  const dbPassword = configService.get<string>('MONGODB_PASSWORD');
  const dbName = configService.get<string>('MONGODB_DATABASE_NAME');

  const mongodbUri = `mongodb+srv://achrafdev:${dbPassword}@proshop.rbkt6.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  return {
    uri: mongodbUri,
    autoIndex: false,
  };
};
