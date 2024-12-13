'use server';

import { getAccessToken } from '@/modules/auth/api/get-access-token';

interface FetchWithAuthConfig extends RequestInit {
  revalidatePaths?: string[];
}

export async function fetchWithAuth(
  url: string,
  config: FetchWithAuthConfig = {},
) {
  const { revalidatePaths, headers, ...rest } = config;
  const accessToken = await getAccessToken();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...rest,
    headers: {
      ...headers,
      Cookie: `access_token=${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response;
}
