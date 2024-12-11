import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const headersList = await headers();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
      {
        headers: {
          Cookie: headersList.get('cookie') || '',
        },
      },
    );

    if (!response.ok) throw new Error('Not authenticated');

    return response.json();
  } catch {
    redirect('/login');
  }
}
