"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface ValidationResultProps {
  validation?: {
    isValid: boolean;
    score: number;
    feedback: string[];
    improvements?: string[];
  };
}

export function ValidationResult({ validation }: ValidationResultProps) {
  if (!validation) {
    return <Card className="w-full h-32 animate-pulse" />;
  }

  const getStatusIcon = () => {
    if (validation.score >= 8) return <CheckCircle2 className="text-green-500 h-6 w-6" />;
    if (validation.score >= 5) return <AlertCircle className="text-yellow-500 h-6 w-6" />;
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
              Product Validation Score: {validation.score}/10
            </h3>
            <p className="text-sm text-muted-foreground">
              {validation.isValid ? "Product meets basic requirements" : "Product needs improvements"}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-medium mb-2">Feedback:</h4>
            <ul className="list-disc list-inside space-y-1">
              {validation.feedback.map((item, index) => (
                <li key={index} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>

          {validation.improvements && validation.improvements.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Suggested Improvements:</h4>
              <ul className="list-disc list-inside space-y-1">
                {validation.improvements.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}