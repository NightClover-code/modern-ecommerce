'use server';

import { revalidatePath } from 'next/cache';
import { User } from '../types/user';
import { cookies } from 'next/headers';
import { cookieConfig } from '@apps/shared/cookie-config';
import { registerSchema } from '../validation';

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponseState {
  data?: {
    user: User;
    title: string;
    description: string;
  };
  error?: {
    title: string;
    description: string;
  };
}

export async function register(
  credentials: RegisterCredentials,
  formState: AuthResponseState,
  formData: FormData,
): Promise<AuthResponseState> {
  const result = registerSchema.safeParse(credentials);

  if (!result.success) {
    return {
      error: {
        title: 'Validation Error!',
        description: result.error.message,
      },
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    const error = await response.json();
    return {
      error: {
        title: 'Oops!',
        description: error.message || 'Registration failed.',
      },
    };
  }

  const data = await response.json();

  const cookieHeader = response.headers.get('set-cookie');
  if (cookieHeader) {
    const userCookies = await cookies();

    userCookies.set(
      cookieConfig.access.name,
      cookieHeader.match(/access_token=([^;]+)/)?.[1] || '',
      cookieConfig.access.options,
    );

    userCookies.set(
      cookieConfig.refresh.name,
      cookieHeader.match(/refresh_token=([^;]+)/)?.[1] || '',
      cookieConfig.refresh.options,
    );
  }

  revalidatePath('/');

  return {
    data: {
      user: data.user,
      title: 'Welcome!',
      description: `Signed in as ${data.user.email}`,
    },
  };
}
