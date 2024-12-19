'use client';

import { ToolInvocation } from 'ai';
import { motion } from 'framer-motion';
import { BotIcon, UserIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Markdown } from '@/components/ui/markdown';
import { ProductInfo } from './tools/product-info';
import { ProductImages } from './tools/product-images';
import { BrandAssets } from './tools/brand-assets';
import { ValidationResult } from './tools/validation-result';

interface MessageProps {
  role: string;
  content: string | ReactNode;
  toolInvocations?: Array<ToolInvocation>;
}

export function Message({ role, content, toolInvocations }: MessageProps) {
  return (
    <motion.div
      className="flex gap-4 px-4 w-full max-w-3xl"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="w-8 h-8 border rounded-sm p-1 flex items-center justify-center shrink-0">
        {role === 'assistant' ? <BotIcon /> : <UserIcon />}
      </div>

      <div className="flex flex-col gap-3 w-full">
        {content && typeof content === 'string' && (
          <div className="text-zinc-800 dark:text-zinc-300">
            <Markdown>{content}</Markdown>
          </div>
        )}

        {toolInvocations && (
          <div className="flex flex-col gap-4">
            {toolInvocations.map(toolInvocation => {
              const { toolName, toolCallId, state } = toolInvocation;

              if (state === 'result') {
                const { result } = toolInvocation;

                return (
                  <div key={toolCallId}>
                    {toolName === 'generateBasicInfo' ? (
                      <ProductInfo productInfo={result} />
                    ) : toolName === 'handleApproval' ? (
                      result.productInfo ? (
                        <ProductInfo productInfo={result.productInfo} />
                      ) : null
                    ) : toolName === 'generateProductImages' ? (
                      <ProductImages images={result.images} />
                    ) : toolName === 'generateBrandAssets' ? (
                      <BrandAssets brandLogo={result.brandLogo} />
                    ) : toolName === 'validateProduct' ? (
                      <ValidationResult {...result} />
                    ) : (
                      <pre className="bg-zinc-100 p-4 rounded-lg overflow-auto">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={toolCallId} className="animate-pulse">
                    {toolName === 'generateBasicInfo' ? (
                      <ProductInfo />
                    ) : toolName === 'generateProductImages' ? (
                      <ProductImages />
                    ) : toolName === 'generateBrandAssets' ? (
                      <BrandAssets />
                    ) : toolName === 'validateProduct' ? (
                      <ValidationResult
                        isValid={false}
                        missingFields={[]}
                        suggestions={[]}
                        marketFitScore={0}
                        pricingFeedback={''}
                      />
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
