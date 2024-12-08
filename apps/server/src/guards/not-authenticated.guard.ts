import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    console.log(token);

    if (!token) {
      return true; // Allow access if no token
    }

    try {
      // Verify the token
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      // If token is valid, deny access (user is already authenticated)
      return false;
    } catch {
      // If token is invalid, allow access
      return true;
    }
  }
}
