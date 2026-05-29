import type { Metadata } from 'next';

const MOCK_RESOURCES: Record<string, { title: string; subject: string; grade: string }> = {
  '1': { title: 'Physics Grade 11 Textbook', subject: 'Physics', grade: 'Grade 11' },
  '2': { title: 'Chemistry Grade 12 Notes', subject: 'Chemistry', grade: 'Grade 12' },
  '3': { title: 'Mathematics Grade 11 Past Paper 2080', subject: 'Mathematics', grade: 'Grade 11' },
  '4': { title: 'Biology Grade 12 Practice Set', subject: 'Biology', grade: 'Grade 12' },
  '5': { title: 'English Grade 10 Textbook', subject: 'English', grade: 'Grade 10' },
  '6': { title: 'Nepali Grade 11 Notes', subject: 'Nepali', grade: 'Grade 11' },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const resource = MOCK_RESOURCES[id];

  if (!resource) {
    return {
      title: 'Resource Not Found',
      description: 'The requested resource could not be found.',
    };
  }

  return {
    title: resource.title,
    description: `${resource.title} - ${resource.subject} ${resource.grade} NEB resource. View, annotate, and study offline.`,
    openGraph: {
      title: `${resource.title} - NEBians`,
      description: `${resource.title} - ${resource.subject} ${resource.grade} NEB resource. View, annotate, and study offline.`,
    },
  };
}

export default function ResourceDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}