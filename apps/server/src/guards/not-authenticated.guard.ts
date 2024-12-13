import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.access_token;

    if (!token) {
      return true; // Allow access if no token
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return false; // Deny access if token is valid
    } catch {
      return true; // Allow access if token is invalid
    }
  }
}
