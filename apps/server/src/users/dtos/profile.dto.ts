import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class ProfileDto {
  @IsString()
  @MinLength(4, { message: 'Username is too short.' })
  @MaxLength(20, { message: 'Username is too long.' })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'Email address is not valid.' })
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(5, { message: 'Password is too short.' })
  @MaxLength(20, { message: 'Password is too long.' })
  @IsOptional()
  password?: string;
}
