'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { useActionState, useEffect, useState } from 'react';
import { createProduct } from '@/modules/products/actions/create-product';
import { productSchema } from '@/modules/products/validation/product';
import { ZodError, type z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductFormData } from '@/modules/products/validation/product';

const categories = [
  'Electronics',
  'Computers',
  'Smart Home',
  'Phones',
  'Cameras',
  'Gaming',
];

export function CreateProductForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormData, string>>
  >({});
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    description: '',
    images: [],
    brand: '',
    category: '',
    countInStock: 0,
    brandLogo: undefined,
  });

  const createProductBound = createProduct.bind(null, formData);
  const [productState, productAction, pending] = useActionState(
    createProductBound,
    {},
  );

  useEffect(() => {
    if (productState.data) {
      toast({
        title: productState.data.title,
        description: productState.data.description,
      });
      router.push('/admin/products');
    } else if (productState.error) {
      toast({
        variant: 'destructive',
        title: productState.error.title,
        description: productState.error.description,
      });
    }
  }, [productState, router]);

  const validateField = (field: keyof ProductFormData, value: any) => {
    try {
      productSchema.shape[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'price' || name === 'countInStock' ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value,
    }));
    validateField('category', value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: Array.from(e.target.files || []),
      }));
    }
  };

  const handleBrandLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({
        ...prev,
        brandLogo: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (formData: FormData) => {
    // Convert formData to match our schema for validation
    const dataToValidate = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      brand: formData.get('brand') as string,
      category: formData.get('category') as string,
      countInStock: Number(formData.get('countInStock')),
      images: Array.from(formData.getAll('images')) as File[],
      brandLogo: formData.get('brandLogo') as File,
    };

    // Validate all fields
    const result = productSchema.safeParse(dataToValidate);

    console.log(result);

    if (!result.success) {
      toast({
        variant: 'destructive',
        title: 'Validation Error in `' + result.error.issues[0].path[0] + '`',
        description: result.error.issues[0].message,
      });
      return;
    }

    // Create new FormData to send
    const formDataToSend = new FormData();

    // Append all form fields
    Object.entries(dataToValidate).forEach(([key, value]) => {
      if (key !== 'images') {
        formDataToSend.append(key, String(value));
      }
    });

    // Append images
    const files = formData.getAll('images');
    if (files.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select at least one image',
      });
      return;
    }

    files.forEach(file => {
      formDataToSend.append('images', file);
    });

    if (dataToValidate.brandLogo) {
      formDataToSend.append('brandLogo', dataToValidate.brandLogo);
    }

    return productAction(formDataToSend);
  };

  return (
    <div className="grid gap-6 w-full max-w-2xl mx-auto">
      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            min={0}
            step={0.01}
            required
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="images">Product Images</Label>
          <Input
            id="images"
            name="images"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            onChange={handleFileChange}
            multiple
            required
          />
          {errors.images && <p className="text-red-500">{errors.images}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
            required
          />
          {errors.brand && <p className="text-red-500">{errors.brand}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            value={formData.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-red-500">{errors.category}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="countInStock">Stock Count</Label>
          <Input
            id="countInStock"
            name="countInStock"
            type="number"
            value={formData.countInStock}
            onChange={handleChange}
            min={0}
            required
          />
          {errors.countInStock && (
            <p className="text-red-500">{errors.countInStock}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brandLogo">Brand Logo</Label>
          <Input
            id="brandLogo"
            name="brandLogo"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            onChange={handleBrandLogoChange}
            required
          />
          {errors.brandLogo && (
            <p className="text-red-500">{errors.brandLogo}</p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Product
        </Button>
      </form>
    </div>
  );
}
