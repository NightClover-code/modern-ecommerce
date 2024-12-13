import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'john@example.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
  })
  @IsString()
  password!: string;
}

export class TokensDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  @IsString()
  accessToken!: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT refresh token',
  })
  @IsString()
  refreshToken!: string;
}

export interface TokenPayload {
  sub: string; // user id
  email: string;
  isAdmin: boolean;
  type: 'access' | 'refresh';
  jti?: string; // Add this for refresh tokens
}

export class UserResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  isAdmin!: boolean;
}

export class AuthResponseDto {
  @ApiProperty()
  tokens!: TokensDto;

  @ApiProperty()
  user!: UserResponseDto;
}
