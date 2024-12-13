import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
      {
        credentials: 'include',
        headers: {
          Cookie: `access_token=${accessToken?.value}`,
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      throw new Error('Not authenticated');
    }

    return response.json();
  } catch (error) {
    redirect('/login');
  }
}
