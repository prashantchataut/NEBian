import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ask a Question',
  description: 'Post your question and get help from fellow NEB students and teachers.',
  openGraph: {
    title: 'Ask a Question - NEBians',
    description: 'Post your question and get help from fellow NEB students and teachers.',
  },
};

export default function AskQuestionLayout({ children }: { children: React.ReactNode }) {
  return children;
}