import type { Metadata } from 'next';
import { satoshi } from './fonts';
import './globals.css';
import { Header } from '@/components/header';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth-provider';
import { CartProvider } from '@/modules/cart/context/cart-context';

export const metadata: Metadata = {
  title: 'Elecshop',
  description: 'Modern eCommerce platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
