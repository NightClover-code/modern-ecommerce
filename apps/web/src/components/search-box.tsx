'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchBox() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/search/${keyword.trim()}`);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full items-center space-x-2">
      <Input
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        className="h-9 md:text-sm"
      />
      <Button type="submit" size="sm" variant="secondary" className="md:px-2">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
