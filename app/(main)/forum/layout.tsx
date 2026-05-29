import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discussion Forum',
  description: 'Ask questions, share knowledge, and help fellow NEB students. Browse discussions by subject and grade.',
  openGraph: {
    title: 'Discussion Forum - NEBians',
    description: 'Ask questions, share knowledge, and help fellow NEB students. Browse discussions by subject and grade.',
  },
};

export default function ForumLayout({ children }: { children: React.ReactNode }) {
  return children;
}