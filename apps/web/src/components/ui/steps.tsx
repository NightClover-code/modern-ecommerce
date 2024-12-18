import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  name: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface StepsProps {
  steps: Step[];
}

export function Steps({ steps }: StepsProps) {
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
              {step.status === 'completed' ? (
                <div className="flex items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <Check className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <span className="ml-3 text-sm font-medium">{step.name}</span>
                </div>
              ) : step.status === 'current' ? (
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
