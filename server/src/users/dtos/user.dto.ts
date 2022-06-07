import { Expose, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UserDto {
  @Expose()
  email: string;

  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: ObjectId;

  @Expose()
  name: string;

  @Expose()
  isAdmin: boolean;

  @Expose()
  accessToken?: string;
}
