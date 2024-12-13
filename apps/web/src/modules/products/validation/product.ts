import * as z from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be greater than 0'),
  image: z.string().optional(),
  brand: z.string().min(1, 'Brand is required'),
  category: z.string().min(1, 'Category is required'),
  countInStock: z.number().min(0, 'Stock count must be 0 or greater'),
});

export type ProductFormData = z.infer<typeof productSchema>;
