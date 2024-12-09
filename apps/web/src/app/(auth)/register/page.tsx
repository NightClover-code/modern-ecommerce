import { AuthLayout } from '@/modules/auth/layouts/auth-layout';
import { RegisterForm } from '@/modules/auth/components/register-form';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Welcome to Elecshop!"
      subtitle="Enter your details to get started."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
