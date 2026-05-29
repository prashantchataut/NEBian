'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SUBJECTS, GRADES, SUBJECT_LABELS, GRADE_LABELS } from '@/types';

export default function AskQuestionPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const canSubmit = title.length >= 10 && content.length >= 20 && subject;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setTitle('');
      setContent('');
      setSubject('');
      setGrade('');
      setTags('');
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => router.push('/forum'), 1000);
    }, 2000);
  };

  return (
    <div className="px-4 lg:px-6 py-6 max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/forum" className="inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors group">
          <ArrowLeft className="h-5 w-5 text-on-surface transition-transform group-hover:-translate-x-0.5" />
        </Link>
        <h1 className="text-xl font-semibold text-on-surface tracking-tight">Ask a Question</h1>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="Title"
          placeholder="What do you need help with?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={title.length > 0 && title.length < 10 ? 'Title must be at least 10 characters' : undefined}
          helperText={`${title.length}/10 minimum characters`}
        />

        <Textarea
          label="Details"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Describe your question in detail. Include what you have tried and where you are stuck."
          error={content.length > 0 && content.length < 20 ? 'Details must be at least 20 characters' : undefined}
          helperText={`${content.length}/20 minimum characters`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="question-subject" className="text-sm font-medium text-on-surface">Subject</label>
            <select
              id="question-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-10 rounded-[var(--radius-sm)] border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-outline transition-[border-color,box-shadow] duration-[var(--transition-fast)]"
            >
              <option value="">Select subject</option>
              {SUBJECTS.map(s => (
                <option key={s} value={s}>{SUBJECT_LABELS[s]}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="question-grade" className="text-sm font-medium text-on-surface">Grade</label>
            <select
              id="question-grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="h-10 rounded-[var(--radius-sm)] border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-outline transition-[border-color,box-shadow] duration-[var(--transition-fast)]"
            >
              <option value="">Select grade</option>
              {GRADES.map(g => (
                <option key={g} value={g}>{GRADE_LABELS[g]}</option>
              ))}
            </select>
          </div>
        </div>

        <Input
          label="Tags (optional)"
          placeholder="e.g., mechanics, calculus, organic-chemistry"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          helperText="Separate tags with commas"
        />

        {success && (
          <div className="rounded-[var(--radius-md)] bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-700 dark:text-green-300 text-center">
            Question posted!
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
          <Link href="/forum">
            <Button variant="ghost" size="md">Cancel</Button>
          </Link>
          <Button variant="primary" size="md" iconLeft={<Send className="h-4 w-4" />} loading={isSubmitting} disabled={!canSubmit || success}>
            Post Question
            </Button>
        </div>
      </form>
    </div>
  );
}