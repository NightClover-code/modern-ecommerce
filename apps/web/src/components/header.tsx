'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SearchBox } from '@/components/search-box';
import { UserMenu } from './navbar/user-menu';
import { CartIcon } from '@/modules/cart/components/cart-icon';

export function Header() {
  return (
    <header className="sm:flex sm:h-20 border-b">
      <Container>
        <div className="relative sm:px-6 lg:px-8 flex h-16 sm:h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl font-bold">ELECSHOP</h1>
            </Link>
          </div>

          <div className="flex-1 mx-8">
            <SearchBox />
          </div>

          <nav className="flex items-center space-x-4">
            <CartIcon />
            <UserMenu />
          </nav>
        </div>
      </Container>
    </header>
  );
}
