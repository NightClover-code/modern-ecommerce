import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { UsersController } from './controller/users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
