import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos';
import { UsersService } from '../services/users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signin')
  logInUser(@Body() { email, password }: CreateUserDto) {}
}
