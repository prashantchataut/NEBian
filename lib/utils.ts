import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length).trim() + '...';
}

export function getSubjectColor(subject: string): string {
  const colors: Record<string, string> = {
    Physics: 'var(--color-subject-physics)',
    Chemistry: 'var(--color-subject-chemistry)',
    Mathematics: 'var(--color-subject-math)',
    Biology: 'var(--color-subject-biology)',
    English: 'var(--color-subject-english)',
    Nepali: 'var(--color-subject-nepali)',
    SocialStudies: 'var(--color-subject-social)',
    ComputerScience: 'var(--color-subject-computer)',
  };
  return colors[subject] || 'var(--color-outline)';
}

export function getResourceTypeColor(type: string): string {
  const colors: Record<string, string> = {
    Textbook: 'var(--color-type-textbook)',
    Notes: 'var(--color-type-notes)',
    PastPaper: 'var(--color-type-pastpaper)',
    PracticeSet: 'var(--color-type-practice)',
  };
  return colors[type] || 'var(--color-outline)';
}