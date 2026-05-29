import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Customize your NEBians experience. Theme, notifications, storage, and more.',
  openGraph: {
    title: 'Settings - NEBians',
    description: 'Customize your NEBians experience. Theme, notifications, storage, and more.',
  },
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}