import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post('/signin')
  async logInUser(@Body() { email, password }: CreateUserDto) {
    const user = await this.authService.signin(email, password);

    return user;
  }
}
