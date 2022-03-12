import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AdminGuard)
  @Get()
  async getUsers() {
    const users = await this.usersService.findAll();

    return users;
  }
}
