export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  maxAge: number;
}

export interface CookieConfig {
  name: string;
  options: CookieOptions;
}

export const cookieConfig: Record<string, CookieConfig> = {
  access: {
    name: 'access_token',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 10 * 60 * 1000, // 10 minutes,
    },
  },
  refresh: {
    name: 'refresh_token',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  },
} as const;