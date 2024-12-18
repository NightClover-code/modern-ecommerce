'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useAiProductCreation } from '../hooks/use-ai-product-creation';
import { Card } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

function formatProductInfo(content: string) {
  console.log(content);

  if (content.includes('Brand:') && content.includes('Category:')) {
    // Split content into product info and follow-up message
    const [productInfo, ...followUpParts] = content.split(
      /(?=Next,|Would you like|Let's)/i,
    );
    const followUpMessage = followUpParts.join(' ').trim();

    const lines = productInfo
      .split(/[-\n]/)
      .map(line => line.trim())
      .filter(Boolean);

    return (
      <div className="space-y-4">
        {/* Product Information */}
        <div className="space-y-3">
          <div className="font-medium">{lines[0].split(':')[0]}</div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {lines.slice(1).map((line, i) => {
              const colonIndex = line.indexOf(':');
              if (colonIndex === -1) return null;

              const label = line.slice(0, colonIndex).trim();
              const value = line.slice(colonIndex + 1).trim();

              if (!label || !value) return null;

              if (label === 'Price') {
                const priceMatch = value.match(/\$?([\d,]+)/);
                const price = priceMatch
                  ? parseFloat(priceMatch[1].replace(/,/g, ''))
                  : 0;

                return (
                  <div key={i} className="col-span-2">
                    <span className="text-muted-foreground">{label}:</span>{' '}
                    <span className="font-semibold">{formatPrice(price)}</span>
                  </div>
                );
              }

              if (label === 'Description') {
                return (
                  <div key={i} className="col-span-2">
                    <span className="text-muted-foreground">{label}:</span>
                    <p className="mt-1 text-sm">{value}</p>
                  </div>
                );
              }

              if (label === 'Stock Availability') {
                return (
                  <div key={i} className="col-span-2">
                    <span className="text-muted-foreground">Stock:</span>{' '}
                    <span>{value}</span>
                  </div>
                );
              }

              return (
                <div key={i}>
                  <span className="text-muted-foreground">{label}:</span>{' '}
                  <span>{value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Follow-up Message */}
        {followUpMessage && (
          <div className="text-sm text-muted-foreground border-t pt-3">
            {followUpMessage}
          </div>
        )}
      </div>
    );
  }

  return <div className="prose prose-sm">{content}</div>;
}

export function AiProductCreator() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    stop,
  } = useAiProductCreation();

  // Add ref for chat container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px]">
      {/* Messages Container */}
      <Card className="flex-1 overflow-hidden flex flex-col">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {messages.map(message => (
            <div
              key={message.id}
              className={cn(
                'max-w-[80%] rounded-lg p-4 animate-slide-in',
                message.role === 'assistant'
                  ? 'bg-muted ml-4'
                  : 'bg-primary/10 ml-auto',
              )}
            >
              <div className="text-sm font-medium mb-1 text-muted-foreground">
                {message.role === 'assistant' ? 'AI Assistant' : 'You'}
              </div>
              {formatProductInfo(message.content)}

              {message.data?.validationErrors && (
                <ul className="mt-2 space-y-1">
                  {message.data.validationErrors.map((error, i) => (
                    <li
                      key={i}
                      className="text-destructive text-sm flex items-center gap-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                      {error.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Input Form */}
        <div className="p-4 border-t bg-background">
          {error && (
            <div className="mb-4 text-destructive text-sm p-2 rounded bg-destructive/10">
              {error.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Describe the product you want to create..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              Send
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={stop}
              disabled={!isLoading}
            >
              Stop
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={reload}
              disabled={isLoading || messages.length === 0}
            >
              Retry
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
