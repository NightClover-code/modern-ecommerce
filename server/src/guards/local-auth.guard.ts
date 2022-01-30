import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { email, password } = request.body;

    if (email.length === 0 || password.length === 0) {
      throw new BadRequestException('Please enter a valid email and password.');
    }

    const parentCanActivate = (await super.canActivate(context)) as boolean;

    return parentCanActivate;
  }
}
