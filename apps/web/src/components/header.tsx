import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBox } from '@/components/search-box';
import { UserMenu } from './navbar/user-menu';

export function Header() {
  return (
    <header className="sm:flex sm:h-20 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 sm:h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl font-bold">ELECSHOP</h1>
            </Link>
          </div>

          <div className="flex-1 mx-8">
            <SearchBox />
          </div>

          <nav className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart />
            </Button>
            <UserMenu />
          </nav>
        </div>
      </Container>
    </header>
  );
}
