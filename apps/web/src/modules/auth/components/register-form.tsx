'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { register } from '../actions/register';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { useAuthStore } from '../store/auth-store';
import { useActionState, useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { registerSchema } from '../validation';

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
  });

  const registerBound = register.bind(null, {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  });
  const [registerState, registerAction, pending] = useActionState(
    registerBound,
    {},
  );

  useEffect(() => {
    if (registerState.data) {
      setUser(registerState.data.user);
      toast({
        title: registerState.data.title,
        description: registerState.data.description,
      });
      router.push('/');
    } else if (registerState.error) {
      toast({
        variant: 'destructive',
        title: registerState.error.title,
        description: registerState.error.description,
      });
    }
  }, [registerState, router, setUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="grid gap-6 w-full">
      <form action={registerAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
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
        <Button className="w-full" type="submit" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create account
        </Button>
      </form>

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

      <div className="grid grid-cols-2 gap-4">
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
        Already have an account?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
