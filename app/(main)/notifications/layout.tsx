import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'Stay updated with activity and announcements from the NEBians community.',
  openGraph: {
    title: 'Notifications - NEBians',
    description: 'Stay updated with activity and announcements from the NEBians community.',
  },
};

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}