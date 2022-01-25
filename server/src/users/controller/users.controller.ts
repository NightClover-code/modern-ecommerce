import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Serialize } from 'src/interceptors';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';
import { UserDocument } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDocument) {
    const { name, _id } = user;

    const { access_token } = await this.authService.login(name, _id);

    return { user, access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: UserDocument) {
    return user;
  }

  @Post('register')
  async register(@Body() { name, email, password }: CreateUserDto) {
    const user = await this.authService.register(name, email, password);

    await this.authService.login(user.name, user._id);

    return user;
  }
}
