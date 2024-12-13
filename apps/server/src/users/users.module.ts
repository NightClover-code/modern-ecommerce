import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controller/auth.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { UsersController } from './controller/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController, UsersController],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
})
export class UsersModule {}
