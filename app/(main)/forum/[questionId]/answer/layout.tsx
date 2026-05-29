import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Write Answer',
  description: 'Share your knowledge and help fellow students by answering questions.',
  openGraph: {
    title: 'Write Answer - NEBians',
    description: 'Share your knowledge and help fellow students by answering questions.',
  },
};

export default function AnswerLayout({ children }: { children: React.ReactNode }) {
  return children;
}