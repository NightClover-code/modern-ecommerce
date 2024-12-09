import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1500px] px-6 lg:px-8 sm:px-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
