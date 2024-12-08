import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'John Doe',
    minLength: 4,
    maxLength: 20,
  })
  @IsString()
  @MinLength(4, { message: 'Username is too short.' })
  @MaxLength(20, { message: 'Username is too long.' })
  name!: string;

  @ApiProperty({
    example: 'john@example.com',
  })
  @IsEmail({}, { message: 'Email address is not valid.' })
  email!: string;

  @ApiProperty({
    example: 'password123',
    minLength: 5,
    maxLength: 20,
  })
  @IsString()
  @MinLength(5, { message: 'Password is too short.' })
  @MaxLength(20, { message: 'Password is too long.' })
  password!: string;
}
