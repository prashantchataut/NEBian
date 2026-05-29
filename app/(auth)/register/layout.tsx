import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create your NEBians account to access resources, forum, and PDF annotations.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}