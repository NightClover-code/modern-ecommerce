import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto, TokensDto, TokenPayload } from '../dtos/auth.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword, verifyPassword } from '@/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await verifyPassword(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(user: UserDocument): Promise<AuthResponseDto> {
    const tokens = await this.generateTokens(user);

    await this.userModel.findByIdAndUpdate(user._id, {
      refreshToken: await hashPassword(tokens.refreshToken),
    });

    return {
      tokens,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    };
  }

  private async generateTokens(user: UserDocument): Promise<TokensDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user._id.toString(),
          email: user.email,
          isAdmin: user.isAdmin,
          type: 'access',
        } as TokenPayload,
        {
          expiresIn: '15m',
          secret: process.env.JWT_ACCESS_SECRET,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user._id.toString(),
          email: user.email,
          isAdmin: user.isAdmin,
          type: 'refresh',
        } as TokenPayload,
        {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_SECRET,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string): Promise<TokensDto> {
    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(
        refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET,
        },
      );

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException();
      }

      const user = await this.userModel.findById(payload.sub);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException();
      }

      const isRefreshTokenValid = await verifyPassword(
        user.refreshToken,
        refreshToken,
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException();
      }

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException();
    }
  }

  async logout(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: null,
    });
  }
}
