'use server';

import { fetchWithAuth } from '@/lib/fetch-with-auth';
import type { PaginatedProducts, Product } from '@apps/shared/types';

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetchWithAuth('/products');

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = (await response.json()) as PaginatedProducts;
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
