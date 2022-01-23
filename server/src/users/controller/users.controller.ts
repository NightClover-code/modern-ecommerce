import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Serialize } from 'src/interceptors';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Controller('auth')
// @Serialize(UserDto)
export class UsersController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('/signin')
  async logInUser(@Body() { email, password }: CreateUserDto) {
    const user = await this.authService.signin(email, password);

    return user;
  }
}
