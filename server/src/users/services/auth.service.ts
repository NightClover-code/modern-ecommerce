import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) throw new NotFoundException('Invalid email or password');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      throw new BadRequestException('Invalid email or password');

    return user;
  }

  async login(username: string, userId: string) {
    const payload = { username, sub: userId };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(name: string, email: string, password: string) {
    const existingUser = await this.usersService.findOne(email);

    if (existingUser) throw new BadRequestException('Email is already in use.');

    const encryptedPassword = await encryptPassword(password);

    const user = await this.usersService.create({
      email,
      password: encryptedPassword,
      isAdmin: false,
      name,
    });

    return user;
  }
}
