'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { login } from '../actions/login';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { useAuthStore } from '../store/auth-store';
import { useActionState, useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { loginSchema } from '../validation';

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const loginBound = login.bind(null, {
    email: formData.email,
    password: formData.password,
  });
  const [loginState, loginAction, pending] = useActionState(loginBound, {});

  useEffect(() => {
    if (loginState.data) {
      setUser(loginState.data.user);
      toast({
        title: loginState.data.title,
        description: loginState.data.description,
      });
      router.push('/');
    } else if (loginState.error) {
      toast({
        variant: 'destructive',
        title: loginState.error.title,
        description: loginState.error.description,
      });
    }
  }, [loginState, router, setUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="grid gap-6 w-full">
      <form action={loginAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            required
          />
        </div>

        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button className="w-full" type="submit" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign in
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
          <Button variant="outline" disabled={pending}>
            <FaGithub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" disabled={pending}>
            <FaGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
