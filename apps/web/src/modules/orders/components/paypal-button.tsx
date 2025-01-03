'use client';

import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { PaymentResult } from '@apps/shared/types/shipping';

interface PayPalButtonProps {
  orderId: string;
  amount: number;
}

function PayPalButtonWrapper({ orderId, amount }: PayPalButtonProps) {
  const [{ isPending }] = usePayPalScriptReducer();
  const { toast } = useToast();
  const router = useRouter();

  const handlePaymentSuccess = async (paymentResult: PaymentResult) => {
    try {
      await apiClient.put(`/orders/${orderId}/pay`, paymentResult);
      toast({
        title: 'Payment Successful',
        description: 'Your order has been paid successfully.',
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Payment Error',
        description: 'There was an error processing your payment.',
        variant: 'destructive',
      });
    }
  };

  if (isPending) {
    return (
      <Button disabled className="w-full" size="lg">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading PayPal...
      </Button>
    );
  }

  return (
    <PayPalButtons
      createOrder={(_, actions) => {
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                value: amount.toString(),
                currency_code: 'USD',
              },
            },
          ],
        });
      }}
      onApprove={async (_, actions) => {
        const details = await actions.order?.capture();
        if (!details) {
          throw new Error('Failed to capture order');
        }

        const paymentSource = details.payment_source?.paypal;
        if (!paymentSource?.email_address) {
          throw new Error('Missing payment information');
        }

        const paymentResult: PaymentResult = {
          id: details.id || '',
          status: details.status || '',
          update_time: details.update_time || '',
          email_address: paymentSource.email_address || '',
        };

        handlePaymentSuccess(paymentResult);
      }}
      onError={() => {
        toast({
          title: 'PayPal Error',
          description: 'There was an error with PayPal. Please try again.',
          variant: 'destructive',
        });
      }}
    />
  );
}

export function PayPalButton(props: PayPalButtonProps) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: 'USD',
      }}
    >
      <PayPalButtonWrapper {...props} />
    </PayPalScriptProvider>
  );
}
