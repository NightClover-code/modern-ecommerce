import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sm:flex sm:h-20 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 sm:h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">ELECSHOP</h1>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart />
            </Button>
            <Button variant="ghost" size="icon">
              <User />
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
