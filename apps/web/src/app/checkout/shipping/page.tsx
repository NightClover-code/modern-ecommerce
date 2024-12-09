import { Container } from '@/components/ui/container';
import { CheckoutSteps } from '@/modules/checkout/components/checkout-steps';
import { ShippingForm } from '@/modules/checkout/components/shipping-form';

export default function ShippingPage() {
  return (
    <Container>
      <div className="max-w-3xl mx-auto py-10 space-y-8">
        <CheckoutSteps currentStep={2} />
        <ShippingForm />
      </div>
    </Container>
  );
}
