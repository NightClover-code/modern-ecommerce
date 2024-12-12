'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { useActionState, useEffect, useState, useRef } from 'react';
import { createProduct } from '@/modules/products/actions/create-product';
import { productSchema } from '@/modules/products/validation/product';
import type { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ProductFormData = z.infer<typeof productSchema>;

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    countInStock: 0,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select an image',
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('image', selectedFile);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price.toString());
    formDataToSend.append('category', formData.category);
    formDataToSend.append('countInStock', formData.countInStock.toString());

    return productAction(formDataToSend);
  };

  return (
    <div className="grid gap-6 w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Product Image</Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
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
        </div>

        <Button className="w-full" type="submit" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Product
        </Button>
      </form>
    </div>
  );
}
