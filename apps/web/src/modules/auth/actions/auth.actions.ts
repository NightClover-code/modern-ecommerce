'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { User } from '../types/user';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

interface AuthResponseState {
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
): Promise<AuthResponseState> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
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
  return {
    data: {
      user: data.user,
      title: 'Welcome back!',
      description: `Signed in as ${data.user.email}`,
    },
  };
}

export async function register(
  credentials: RegisterCredentials,
): Promise<AuthResponseState> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
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
  return {
    data: {
      user: data.user,
      title: 'Welcome!',
      description: `Signed in as ${data.user.email}`,
    },
  };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  redirect('/login');
}
