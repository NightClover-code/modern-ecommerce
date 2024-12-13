'use server';

import { fetchWithAuth } from '@/lib/fetch-with-auth';

export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  countInStock: number;
}

export async function getProducts() {
  try {
    const response = await fetchWithAuth('/products');
    const data = await response.json();
    return data.products as Product[];
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch products');
  }
}
