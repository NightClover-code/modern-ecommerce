'use client';

import { SendIcon, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRef, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface ProductExpertInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  stop: () => void;
}

export function ProductExpertInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
}: ProductExpertInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (isLoading) {
        toast({
          title: 'Please wait for the AI to finish its response!',
          variant: 'destructive',
        });
      } else {
        handleSubmit(e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        placeholder="Ask about product development..."
        className="pr-24 resize-none"
        rows={1}
      />

      {isLoading ? (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute right-2 top-2"
          onClick={e => {
            e.preventDefault();
            stop();
          }}
        >
          <StopCircle className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 top-2"
          disabled={!input.trim()}
        >
          <SendIcon className="h-4 w-4" />
        </Button>
      )}
    </form>
  );
}
