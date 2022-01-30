import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  email: string;

  @Expose()
  _id: string;

  @Expose()
  name: string;

  @Expose()
  isAdmin: boolean;

  @Expose()
  accessToken?: string;
}
