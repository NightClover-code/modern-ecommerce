import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { UserDocument } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';

@Serialize(LoginDto)
@Controller('auth')
export class UsersController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDocument) {
    const { name, _id, isAdmin } = user;

    const { accessToken } = await this.authService.login(name, _id);

    return { name, _id, isAdmin, accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: UserDocument) {
    return user;
  }

  @Post('register')
  async register(@Body() { name, email, password }: RegisterDto) {
    const user = await this.authService.register(name, email, password);

    await this.authService.login(user.name, user._id);

    return user;
  }
}
