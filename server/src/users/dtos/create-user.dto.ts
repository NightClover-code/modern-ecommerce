import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
