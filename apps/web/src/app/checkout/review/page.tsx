import { Container } from '@/components/ui/container';
import { CheckoutSteps } from '@/modules/checkout/components/checkout-steps';
import { OrderReview } from '@/modules/checkout/components/order-review';

export default function ReviewPage() {
  return (
    <Container>
      <div className="max-w-7xl mx-auto py-10 space-y-8">
        <CheckoutSteps currentStep={4} />
        <OrderReview />
      </div>
    </Container>
  );
}
