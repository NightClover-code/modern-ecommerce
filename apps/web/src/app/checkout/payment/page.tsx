import { Container } from '@/components/ui/container';
import { CheckoutSteps } from '@/modules/checkout/components/checkout-steps';
import { PaymentForm } from '@/modules/checkout/components/payment-form';

export default function PaymentPage() {
  return (
    <Container>
      <div className="max-w-3xl mx-auto py-10 space-y-8">
        <CheckoutSteps currentStep={3} />
        <PaymentForm />
      </div>
    </Container>
  );
}
