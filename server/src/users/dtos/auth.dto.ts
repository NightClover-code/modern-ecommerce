import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

export class TokensDto {
  @IsString()
  accessToken!: string;

  @IsString()
  refreshToken!: string;
}

export interface TokenPayload {
  sub: string; // user id
  email: string;
  isAdmin: boolean;
  type: 'access' | 'refresh';
}

export interface AuthResponse {
  tokens: TokensDto;
  user: {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
  };
}
