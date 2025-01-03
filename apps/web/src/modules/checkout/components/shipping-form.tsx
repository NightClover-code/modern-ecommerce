'use client';

import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useCheckout } from '../context/checkout-context';
import { getCountries } from '@/lib/countries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

interface ShippingFormData {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export function ShippingForm() {
  const { setShippingAddress } = useCheckout();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<ShippingFormData>();

  const onSubmit = async (data: ShippingFormData) => {
    try {
      const response = await apiClient.post('/cart/shipping', data);
      const shippingAddress = response.data;
      setShippingAddress(shippingAddress);
      router.push('/checkout/payment');
    } catch (error) {
      toast({
        title: 'Error saving shipping details',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Shipping Address</h1>
        <p className="text-sm text-muted-foreground">
          Enter your shipping details
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="address">Street Address</label>
          <Input
            id="address"
            {...register('address', { required: 'Address is required' })}
            placeholder="123 Main St"
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="city">City</label>
          <Input
            id="city"
            {...register('city', { required: 'City is required' })}
            placeholder="New York"
          />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <Input
            id="postalCode"
            {...register('postalCode', { required: 'Postal code is required' })}
            placeholder="10001"
          />
          {errors.postalCode && (
            <p className="text-sm text-red-500">{errors.postalCode.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <Controller
            name="country"
            control={control}
            rules={{ required: 'Country is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {getCountries().map(country => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center gap-2">
                        {country.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Continue to Payment
        </Button>
      </form>
    </Card>
  );
}
