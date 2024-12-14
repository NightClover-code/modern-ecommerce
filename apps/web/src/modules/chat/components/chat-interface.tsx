'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Product } from '@apps/shared/types';

interface ChatInterfaceProps {
  mode?: 'general' | 'product-creation';
  onProductUpdate?: (product: Partial<Product>) => void;
}

export function ChatInterface({
  mode = 'general',
  onProductUpdate,
}: ChatInterfaceProps) {
  const apiEndpoint =
    mode === 'product-creation' ? '/api/products/agent/test' : '/api/chat';

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: apiEndpoint,
    // onResponse: response => {
    //   if (mode === 'product-creation' && response.productUpdate) {
    //     onProductUpdate?.(response.productUpdate);
    //   }
    // },
  });

  return (
    <div className="flex flex-col h-[600px] border rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={cn(
              'p-4 rounded-lg',
              message.role === 'assistant'
                ? 'bg-muted ml-4'
                : 'bg-primary/10 mr-4',
            )}
          >
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={
              mode === 'product-creation'
                ? 'Describe the product you want to create...'
                : 'Ask about our products...'
            }
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
}
