import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { TopBar } from '@/components/layout/top-bar';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Your modern learning platform for Nepali NEB students. Browse resources, discuss questions, and study offline.',
  openGraph: {
    title: 'NEBians - Home',
    description: 'Your modern learning platform for Nepali NEB students. Browse resources, discuss questions, and study offline.',
  },
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <Sidebar />
      <div className="lg:pl-[260px]">
        <TopBar />
        <main className="pt-14 pb-20 lg:pb-6">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}