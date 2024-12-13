'use client';

import { useUser } from '@/modules/auth/hooks/use-user';
import { redirect } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user?.isAdmin || error) {
    redirect('/login');
  }

  return children;
}
