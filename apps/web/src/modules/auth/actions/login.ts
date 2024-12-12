'use server';

import { revalidatePath } from 'next/cache';
import { User } from '../types/user';
import { cookies } from 'next/headers';
import { cookieConfig } from '@apps/shared/cookie-config';
import { loginSchema } from '../validation';

export interface LoginCredentials {
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

export async function login(
  credentials: LoginCredentials,
  formState: AuthResponseState,
  formData: FormData,
): Promise<AuthResponseState> {
  const result = loginSchema.safeParse(credentials);

  if (!result.success) {
    return {
      error: {
        title: 'Validation Error!',
        description: result.error.message,
      },
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
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
        description: error.message || 'Login failed.',
      },
    };
  }

  const data = await response.json();

  // Get the cookies from the response
  const cookieHeader = response.headers.get('set-cookie');
  if (cookieHeader) {
    const userCookies = await cookies();

    // Set the cookies in the next.js response
    userCookies.set(
      'access_token',
      cookieHeader.match(/access_token=([^;]+)/)?.[1] || '',
      cookieConfig.access.options,
    );

    userCookies.set(
      'refresh_token',
      cookieHeader.match(/refresh_token=([^;]+)/)?.[1] || '',
      cookieConfig.refresh.options,
    );
  }

  revalidatePath('/');

  return {
    data: {
      user: data.user,
      title: 'Welcome back!',
      description: `Signed in as ${data.user.email}`,
    },
  };
}
