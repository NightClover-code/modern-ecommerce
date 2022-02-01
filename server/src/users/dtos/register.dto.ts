import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(4, { message: 'Username is too short.' })
  @MaxLength(20, { message: 'Username is too long.' })
  name: string;

  @IsEmail({}, { message: 'Email address is not valid.' })
  email: string;

  @IsString()
  @MinLength(5, { message: 'Password is too short.' })
  @MaxLength(20, { message: 'Please is too long.' })
  password: string;
}
