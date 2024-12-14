import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AdminProfileDto } from '../dtos/admin.profile.dto';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';
import { PaginatedUsersDto } from '../dtos/paginated-users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Serialize(PaginatedUsersDto)
  @UseGuards(AdminGuard)
  @Get()
  async getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return this.usersService.findAll(pageNumber, limitNumber);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteOne(id);
  }

  @Serialize(UserDto)
  @UseGuards(AdminGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Serialize(UserDto)
  @UseGuards(AdminGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() credentials: AdminProfileDto,
  ) {
    return this.usersService.adminUpdate(id, credentials);
  }

  @Serialize(UserDto)
  @Post('seed')
  @UseGuards(AdminGuard)
  async generateUsers() {
    return this.usersService.generateUsers(500);
  }
}
