import { AuthLayout } from '@/modules/auth/layouts/auth-layout';
import { LoginForm } from '@/modules/auth/components/login-form';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Log in to your account"
      subtitle="Welcome back! Please enter your details."
    >
      <LoginForm />
    </AuthLayout>
  );
}
