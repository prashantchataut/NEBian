export type Subject = 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology' | 'English' | 'Nepali' | 'SocialStudies' | 'ComputerScience';

export type Grade = 'Grade10' | 'Grade11' | 'Grade12';

export type ResourceType = 'Textbook' | 'Notes' | 'PastPaper' | 'PracticeSet';

export interface Resource {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  grade: Grade;
  type: ResourceType;
  fileUrl: string;
  fileSize: number;
  thumbnailUrl: string | null;
  pageCount: number | null;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  authorId: string;
  author: User;
  title: string;
  content: string;
  subject: Subject | null;
  grade: Grade | null;
  tags: string[];
  likesCount: number;
  answersCount: number;
  isLikedByMe: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  id: string;
  questionId: string;
  authorId: string;
  author: User;
  content: string;
  likesCount: number;
  isAccepted: boolean;
  isLikedByMe: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PdfAnnotation {
  id: string;
  pdfId: string;
  type: 'highlight' | 'underline' | 'sticky-note';
  pageNumber: number;
  rect: { x: number; y: number; width: number; height: number } | null;
  position: { x: number; y: number } | null;
  text: string | null;
  color: string;
  createdAt: number;
  updatedAt: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'announcement' | 'answer' | 'like';
  title: string;
  content: string | null;
  link: string | null;
  read: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  grade: Grade | null;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  resourceId: string;
  createdAt: string;
}

export interface ReadingProgress {
  pdfId: string;
  currentPage: number;
  totalPages: number;
  lastReadAt: number;
}

export const SUBJECTS: Subject[] = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Nepali', 'SocialStudies', 'ComputerScience'];

export const GRADES: Grade[] = ['Grade10', 'Grade11', 'Grade12'];

export const RESOURCE_TYPES: ResourceType[] = ['Textbook', 'Notes', 'PastPaper', 'PracticeSet'];

export const SUBJECT_COLORS: Record<Subject, string> = {
  Physics: 'var(--color-subject-physics)',
  Chemistry: 'var(--color-subject-chemistry)',
  Mathematics: 'var(--color-subject-math)',
  Biology: 'var(--color-subject-biology)',
  English: 'var(--color-subject-english)',
  Nepali: 'var(--color-subject-nepali)',
  SocialStudies: 'var(--color-subject-social)',
  ComputerScience: 'var(--color-subject-computer)',
};

export const SUBJECT_LABELS: Record<Subject, string> = {
  Physics: 'Physics',
  Chemistry: 'Chemistry',
  Mathematics: 'Mathematics',
  Biology: 'Biology',
  English: 'English',
  Nepali: 'Nepali',
  SocialStudies: 'Social Studies',
  ComputerScience: 'Computer Science',
};

export const GRADE_LABELS: Record<Grade, string> = {
  Grade10: 'Grade 10',
  Grade11: 'Grade 11',
  Grade12: 'Grade 12',
};

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  Textbook: 'Textbook',
  Notes: 'Notes',
  PastPaper: 'Past Paper',
  PracticeSet: 'Practice Set',
};

export const RESOURCE_TYPE_COLORS: Record<ResourceType, string> = {
  Textbook: 'var(--color-type-textbook)',
  Notes: 'var(--color-type-notes)',
  PastPaper: 'var(--color-type-pastpaper)',
  PracticeSet: 'var(--color-type-practice)',
};

export const ANNOTATION_COLORS = [
  { name: 'Yellow', value: '#FBBF24' },
  { name: 'Green', value: '#34D399' },
  { name: 'Blue', value: '#60A5FA' },
  { name: 'Pink', value: '#F472B6' },
  { name: 'Orange', value: '#FB923C' },
] as const;