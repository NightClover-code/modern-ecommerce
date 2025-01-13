'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard } from 'lucide-react';
import { FaPaypal } from 'react-icons/fa';
import { useCheckout } from '../context/checkout-context';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  paymentMethod: z.enum(['PayPal', 'Stripe'], {
    required_error: 'Please select a payment method.',
  }),
});

export function PaymentForm() {
  const { setPaymentMethod } = useCheckout();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: 'PayPal',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await apiClient.post('/cart/payment', {
        paymentMethod: values.paymentMethod,
      });
      const paymentMethod = response.data;
      console.log(paymentMethod);
      setPaymentMethod(paymentMethod);
      router.push('/checkout/review');
    } catch (error) {
      toast({
        title: 'Error saving payment method',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Payment Method</h1>
          <p className="text-sm text-muted-foreground">
            Choose how you would like to pay
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem>
                        <FormControl>
                          <label
                            htmlFor="PayPal"
                            className="border rounded-lg p-4 cursor-pointer hover:border-primary [&:has(:checked)]:border-primary block"
                          >
                            <RadioGroupItem
                              value="PayPal"
                              id="PayPal"
                              className="sr-only"
                            />
                            <div className="flex flex-col items-center space-y-2">
                              <FaPaypal className="h-6 w-6" />
                              <span className="text-sm font-medium">
                                PayPal
                              </span>
                            </div>
                          </label>
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <label
                            htmlFor="Stripe"
                            className="border rounded-lg p-4 cursor-pointer hover:border-primary [&:has(:checked)]:border-primary block"
                          >
                            <RadioGroupItem
                              value="Stripe"
                              id="Stripe"
                              className="sr-only"
                            />
                            <div className="flex flex-col items-center space-y-2">
                              <CreditCard className="h-6 w-6" />
                              <span className="text-sm font-medium">Card</span>
                            </div>
                          </label>
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Continue to Review
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
