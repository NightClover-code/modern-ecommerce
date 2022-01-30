import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { RegisterDto } from '../dtos/register.dto';
import { UserDto } from '../dtos/user.dto';
import { UserDocument } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDocument, @Session() session: any) {
    const { name, _id, email, isAdmin } = user;

    const { accessToken } = await this.authService.login(name, _id);

    const loggedUser = { name, _id, isAdmin, email, accessToken };

    session.user = loggedUser;

    return loggedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Session() session: any) {
    return session.user;
  }

  @Post('logout')
  async logout(@Session() session: any) {
    session.user = null;
  }

  @Post('register')
  async register(@Body() { name, email, password }: RegisterDto) {
    const user = await this.authService.register(name, email, password);

    await this.authService.login(user.name, user._id);

    return user;
  }
}
