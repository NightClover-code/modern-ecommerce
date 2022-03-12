import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { UsersService } from '../services/users.service';

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
