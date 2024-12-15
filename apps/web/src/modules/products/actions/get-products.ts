'use server';

import { fetchWithAuth } from '@/lib/fetch-with-auth';
import type { PaginatedResponse, Product } from '@apps/shared/types';

export async function getProducts(
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResponse<Product>> {
  try {
    const response = await fetchWithAuth(
      `/products?page=${page}&limit=${limit}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = (await response.json()) as PaginatedResponse<Product>;
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      items: [],
      total: 0,
      page: 1,
      pages: 1,
    };
  }
}
