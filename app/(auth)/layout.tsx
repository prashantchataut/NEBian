import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your NEBians account to access resources, forum, and PDF annotations.',
  openGraph: {
    title: 'Sign In - NEBians',
    description: 'Sign in to your NEBians account to access resources, forum, and PDF annotations.',
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-surface-container-low p-4">
      <div className="w-full max-w-sm animate-scale-in">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-primary text-on-primary font-bold text-lg transition-transform duration-[var(--transition-fast)] group-active:scale-95">
              N
            </div>
            <span className="text-xl font-semibold text-on-surface tracking-tight">NEBians</span>
          </Link>
        </div>
        <div className="rounded-[var(--radius-lg)] bg-surface p-6 border border-outline-variant">
          {children}
        </div>
      </div>
    </div>
  );
}