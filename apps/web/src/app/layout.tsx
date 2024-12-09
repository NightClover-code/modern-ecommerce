import type { Metadata } from 'next';
import { satoshi } from './fonts';
import './globals.css';
import { Header } from '@/components/header';

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
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
