'use client';

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface StripeButtonProps {
  orderId: string;
  amount: number;
}

function StripeForm({ orderId, amount }: StripeButtonProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      toast({
        title: 'Payment Error',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    // Update order status
    await apiClient.put(`/orders/${orderId}/pay`, {
      id: paymentIntent.id,
      status: paymentIntent.status,
      update_time: new Date().toISOString(),
      email_address: paymentIntent.receipt_email || '',
    });

    toast({
      title: 'Payment Successful',
      description: 'Your order has been paid successfully.',
    });

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" disabled={!stripe} className="w-full mt-4">
        {!stripe ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          'Pay Now'
        )}
      </Button>
    </form>
  );
}

export function StripeButton({ orderId, amount }: StripeButtonProps) {
  const [clientSecret, setClientSecret] = useState<string>();

  useEffect(() => {
    // Get payment intent
    fetch('/api/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [amount]);

  if (!clientSecret) {
    return (
      <Button disabled className="w-full">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading Stripe...
      </Button>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripeForm orderId={orderId} amount={amount} />
    </Elements>
  );
}
