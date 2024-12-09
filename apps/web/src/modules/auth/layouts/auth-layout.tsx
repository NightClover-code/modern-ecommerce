import { Container } from '@/components/ui/container';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <Container className="h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </Container>
  );
}
