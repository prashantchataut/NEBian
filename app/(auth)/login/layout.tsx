import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your NEBians account to access resources, forum, and PDF annotations.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}