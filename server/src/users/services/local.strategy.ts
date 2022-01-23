import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../schemas/user.schema';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);

    return user;
  }
}
