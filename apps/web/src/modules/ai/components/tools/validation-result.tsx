'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface ValidationResultProps {
  isValid: boolean;
  missingFields: string[];
  suggestions: string[];
  marketFitScore: number;
  pricingFeedback: string;
}

export function ValidationResult({
  isValid,
  missingFields,
  suggestions,
  marketFitScore,
  pricingFeedback,
}: ValidationResultProps) {
  if (!isValid) {
    return <Card className="w-full h-32 animate-pulse" />;
  }

  const getStatusIcon = () => {
    if (marketFitScore >= 80)
      return <CheckCircle2 className="text-green-500 h-6 w-6" />;
    if (marketFitScore >= 50)
      return <AlertCircle className="text-yellow-500 h-6 w-6" />;
    return <XCircle className="text-red-500 h-6 w-6" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="p-4 space-y-4">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <h3 className="font-semibold">
              Market Fit Score: {marketFitScore}/100
            </h3>
            <p className="text-sm text-muted-foreground">
              {isValid
                ? 'Product details are complete'
                : 'Missing required information'}
            </p>
          </div>
        </div>

        {missingFields.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-red-500 mb-2">
              Missing Fields:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {missingFields.map((field, index) => (
                <li key={index} className="text-sm text-red-500">
                  {field}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium mb-2">Pricing Analysis:</h4>
          <p className="text-sm text-muted-foreground">{pricingFeedback}</p>
        </div>

        {suggestions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Suggestions:</h4>
            <ul className="list-disc list-inside space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
