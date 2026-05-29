import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Join NEBians - the modern learning platform for Nepali NEB students.',
  openGraph: {
    title: 'Create Account - NEBians',
    description: 'Join NEBians - the modern learning platform for Nepali NEB students.',
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}