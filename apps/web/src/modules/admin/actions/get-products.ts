'use server';

import { fetchWithAuth } from '@/lib/fetch-with-auth';

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  countInStock: number;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetchWithAuth('/products');

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
