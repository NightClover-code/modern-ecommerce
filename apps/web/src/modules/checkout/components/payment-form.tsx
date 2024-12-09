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
} from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard } from 'lucide-react';
import { FaPaypal } from 'react-icons/fa';

const formSchema = z.object({
  paymentMethod: z.enum(['paypal', 'card'], {
    required_error: 'Please select a payment method.',
  }),
});

export function PaymentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: 'paypal',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Will implement later
    console.log(values);
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
                          <div className="border rounded-lg p-4 cursor-pointer hover:border-primary [&:has(:checked)]:border-primary">
                            <RadioGroupItem
                              value="paypal"
                              id="paypal"
                              className="sr-only"
                            />
                            <div className="flex flex-col items-center space-y-2">
                              <FaPaypal className="h-6 w-6" />
                              <span className="text-sm font-medium">
                                PayPal
                              </span>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <div className="border rounded-lg p-4 cursor-pointer hover:border-primary [&:has(:checked)]:border-primary">
                            <RadioGroupItem
                              value="card"
                              id="card"
                              className="sr-only"
                            />
                            <div className="flex flex-col items-center space-y-2">
                              <CreditCard className="h-6 w-6" />
                              <span className="text-sm font-medium">
                                Credit Card
                              </span>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg">
              Continue to Review
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
