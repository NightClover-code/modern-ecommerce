'use server';

import { ProductFormData, productSchema } from '../validation/product';
import { revalidatePath } from 'next/cache';

export interface ProductResponseState {
  data?: {
    title: string;
    description: string;
  };
  error?: {
    title: string;
    description: string;
  };
}

export async function createProduct(
  data: ProductFormData,
  formState: ProductResponseState,
  formData: FormData,
): Promise<ProductResponseState> {
  const result = productSchema.safeParse(data);

  if (!result.success) {
    return {
      error: {
        title: 'Validation Error',
        description: result.error.message,
      },
    };
  }

  try {
    const response = await fetch('/products', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error: {
          title: 'Error',
          description: error.message || 'Failed to create product',
        },
      };
    }

    revalidatePath('/admin/products');

    return {
      data: {
        title: 'Success',
        description: 'Product created successfully',
      },
    };
  } catch (error: any) {
    return {
      error: {
        title: 'Error',
        description: error.message || 'Failed to create product',
      },
    };
  }
}