'use server';

import { fetchWithAuth } from '@/lib/fetch-with-auth';
import type { Product } from '@apps/shared/types';

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetchWithAuth(`/products/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
