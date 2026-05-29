import type { Metadata } from 'next';

const MOCK_QUESTIONS: Record<string, { title: string; subject: string }> = {
  '1': { title: 'How to solve projectile motion problems in Physics?', subject: 'Physics' },
  '2': { title: 'Organic chemistry reaction mechanisms for NEB exam', subject: 'Chemistry' },
  '3': { title: 'Integration techniques for NEB Mathematics', subject: 'Mathematics' },
  '4': { title: 'Best resources for NEB Biology preparation?', subject: 'Biology' },
};

export async function generateMetadata({ params }: { params: Promise<{ questionId: string }> }): Promise<Metadata> {
  const { questionId } = await params;
  const question = MOCK_QUESTIONS[questionId];

  if (!question) {
    return {
      title: 'Question Not Found',
      description: 'The requested question could not be found.',
    };
  }

  return {
    title: question.title,
    description: `${question.title} - ${question.subject} discussion on NEBians. Ask questions, share answers, and learn together.`,
    openGraph: {
      title: `${question.title} - NEBians`,
      description: `${question.title} - ${question.subject} discussion on NEBians. Ask questions, share answers, and learn together.`,
    },
  };
}

export default function QuestionDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}