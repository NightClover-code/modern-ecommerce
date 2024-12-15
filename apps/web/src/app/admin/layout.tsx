'use client';

import { useUser } from '@/modules/auth/hooks/use-user';
import { redirect } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <Container>
        <div className="h-[calc(100vh-5rem)] flex items-center justify-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-lg">Loading users...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (!user?.isAdmin || error) {
    redirect('/login');
  }

  return children;
}
