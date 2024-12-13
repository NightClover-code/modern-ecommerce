'use client';

import { useUser } from '@/modules/auth/hooks/use-user';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      redirect('/');
    }
  }, [user, isLoading]);

  if (isLoading) return null;

  return children;
}
