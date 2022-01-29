import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { email, password } = request.body;

    if (email.length === 0 || password.length === 0)
      throw new BadRequestException('Please enter a valid email and password.');

    return true;
  }
}
