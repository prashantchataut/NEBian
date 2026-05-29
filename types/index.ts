export type Stream = 'Science' | 'Management' | 'Humanities';

export type Subject = 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology' | 'English' | 'Nepali' | 'SocialStudies' | 'ComputerScience' | 'Accountancy' | 'Economics' | 'OptionalMathematics' | 'Science';

export type Grade = 'Grade10' | 'Grade11' | 'Grade12' | 'BothPassout';

export type ResourceType = 'Textbook' | 'Notes' | 'PastPaper' | 'PracticeSet';

export type Gender = 'Male' | 'Female' | 'Other';

export type ContentScope = 'MyGradeOnly' | 'All';

export type NepaliProvince = 
  | 'Koshi' | 'Madhesh' | 'Bagmati' | 'Gandaki' | 'Lumbini' | 'Karnali' | 'Sudurpashchim';

export interface ProfileData {
  username: string;
  dateOfBirth: string;
  gender: Gender | null;
  grade: Grade | null;
  stream: Stream | null;
  subjects: Subject[];
  province: NepaliProvince | null;
  district: string;
  school: string;
  lockProfile: boolean;
  contentScope: ContentScope;
}

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
  username: string;
  email: string;
  avatarUrl: string | null;
  grade: Grade | null;
  stream: Stream | null;
  subjects: Subject[];
  contentScope: ContentScope;
  province: NepaliProvince | null;
  district: string;
  school: string;
  lockProfile: boolean;
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

export const SUBJECTS_BY_GRADE: Record<string, Subject[]> = {
  Grade10: ['English', 'Nepali', 'Mathematics', 'SocialStudies', 'Science', 'OptionalMathematics', 'Accountancy', 'Economics', 'ComputerScience'],
  Grade11_Science: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Nepali', 'ComputerScience'],
  Grade11_Management: ['Accountancy', 'Economics', 'English', 'Nepali', 'Mathematics', 'ComputerScience'],
  Grade11_Humanities: ['English', 'Nepali', 'SocialStudies', 'Economics', 'ComputerScience'],
  Grade12_Science: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Nepali', 'ComputerScience'],
  Grade12_Management: ['Accountancy', 'Economics', 'English', 'Nepali', 'Mathematics', 'ComputerScience'],
  Grade12_Humanities: ['English', 'Nepali', 'SocialStudies', 'Economics', 'ComputerScience'],
  BothPassout: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Nepali', 'SocialStudies', 'ComputerScience', 'Accountancy', 'Economics', 'Science', 'OptionalMathematics'],
};

export const SUBJECTS: Subject[] = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Nepali', 'SocialStudies', 'ComputerScience', 'Accountancy', 'Economics', 'OptionalMathematics', 'Science'];

export const GRADES: Grade[] = ['Grade10', 'Grade11', 'Grade12', 'BothPassout'];

export const GENDERS: Gender[] = ['Male', 'Female', 'Other'];

export const STREAMS: Stream[] = ['Science', 'Management', 'Humanities'];

export const NEPALI_PROVINCES: NepaliProvince[] = ['Koshi', 'Madhesh', 'Bagmati', 'Gandaki', 'Lumbini', 'Karnali', 'Sudurpashchim'];

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
  Accountancy: 'var(--color-subject-accountancy)',
  Economics: 'var(--color-subject-economics)',
  OptionalMathematics: 'var(--color-subject-optionalmathematics)',
  Science: 'var(--color-subject-science)',
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
  Accountancy: 'Accountancy',
  Economics: 'Economics',
  OptionalMathematics: 'Optional Maths',
  Science: 'Science',
};

export const GRADE_LABELS: Record<Grade, string> = {
  Grade10: 'Grade 10',
  Grade11: 'Class 11',
  Grade12: 'Class 12',
  BothPassout: 'Both/Passout',
};

export const STREAM_LABELS: Record<Stream, string> = {
  Science: 'Science',
  Management: 'Management',
  Humanities: 'Humanities',
};

export const GENDER_LABELS: Record<Gender, string> = {
  Male: 'Male',
  Female: 'Female',
  Other: 'Other',
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

export const GRADE_REQUIRES_STREAM: Record<Grade, boolean> = {
  Grade10: false,
  Grade11: true,
  Grade12: true,
  BothPassout: false,
};

export function getSubjectsKey(grade: Grade, stream?: Stream | null): string {
  if (grade === 'Grade10' || grade === 'BothPassout') return `Grade10`;
  return `${grade}_${stream || 'Science'}`;
}

export function getSubjectsForGrade(grade: Grade, stream?: Stream | null): Subject[] {
  const key = getSubjectsKey(grade, stream);
  return SUBJECTS_BY_GRADE[key] || SUBJECTS;
}

export const ANNOTATION_COLORS = [
  { name: 'Yellow', value: '#FBBF24' },
  { name: 'Green', value: '#34D399' },
  { name: 'Blue', value: '#60A5FA' },
  { name: 'Pink', value: '#F472B6' },
  { name: 'Orange', value: '#FB923C' },
] as const;