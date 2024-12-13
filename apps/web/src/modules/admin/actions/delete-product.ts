'use server';

import { fetchWithAuth } from '@/lib/fetch-with-auth';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(productId: string) {
  try {
    const response = await fetchWithAuth(`/products/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to delete product',
    };
  }
}
