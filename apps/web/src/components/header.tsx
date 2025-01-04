'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SearchBox } from '@/components/search-box';
import { UserMenu } from './navbar/user-menu';
import { CartIcon } from '@/modules/cart/components/cart-icon';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <Link href="/" className="font-bold text-xl md:text-lg">
              ELECSHOP
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-8 md:max-w-sm sm:max-w-[200px] xxs:hidden">
            <SearchBox />
          </div>

          <nav className="flex items-center gap-4 md:gap-2 sm:hidden">
            <ThemeToggle />
            <CartIcon />
            <UserMenu />
          </nav>
        </div>
      </Container>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="sm:block hidden border-t">
          <Container>
            <div className="py-4 space-y-4">
              <SearchBox />
              <div className="flex items-center justify-between pt-4 border-t">
                <ThemeToggle />
                <CartIcon />
                <UserMenu />
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
