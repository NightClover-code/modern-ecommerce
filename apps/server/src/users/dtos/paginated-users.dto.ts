import { Expose, Type } from 'class-transformer';
import { UserDto } from './user.dto';

export class PaginatedUsersDto {
  @Expose()
  @Type(() => UserDto)
  items!: UserDto[];

  @Expose()
  total!: number;

  @Expose()
  page!: number;

  @Expose()
  pages!: number;
}
