import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckoutStepsProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: 'Sign In' },
  { id: 2, name: 'Shipping' },
  { id: 3, name: 'Payment' },
  { id: 4, name: 'Place Order' },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="w-full">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-center">
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={cn(
                stepIdx !== steps.length - 1 ? 'pr-20' : '',
                'relative',
              )}
            >
              {step.id < currentStep ? (
                // Completed step
                <div className="flex items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <Check className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <span className="ml-3 text-sm font-medium">{step.name}</span>
                </div>
              ) : step.id === currentStep ? (
                // Current step
                <div className="flex items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary">
                    <span className="text-sm font-medium text-primary">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-3 text-sm font-medium text-primary">
                    {step.name}
                  </span>
                </div>
              ) : (
                // Upcoming step
                <div className="flex items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted">
                    <span className="text-sm font-medium text-muted-foreground">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-3 text-sm font-medium text-muted-foreground">
                    {step.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
