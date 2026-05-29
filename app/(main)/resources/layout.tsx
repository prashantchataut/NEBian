import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Browse textbooks, notes, past papers, and practice sets for NEB exam preparation. Filter by subject, grade, and type.',
  openGraph: {
    title: 'Resources - NEBians',
    description: 'Browse textbooks, notes, past papers, and practice sets for NEB exam preparation. Filter by subject, grade, and type.',
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}