'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SUBJECTS, GRADES, SUBJECT_LABELS, GRADE_LABELS } from '@/types';

export default function AskQuestionPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = title.length >= 10 && content.length >= 20 && subject;

  return (
    <div className="px-4 lg:px-6 py-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/forum" className="inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors">
          <ArrowLeft className="h-5 w-5 text-on-surface" />
        </Link>
        <h1 className="text-xl font-semibold text-on-surface">Ask a Question</h1>
      </div>

      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); if (canSubmit) { setIsSubmitting(true); } }}>
        <Input
          label="Title"
          placeholder="What do you need help with?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={title.length > 0 && title.length < 10 ? 'Title must be at least 10 characters' : undefined}
          helperText={`${title.length}/10 minimum characters`}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-on-surface">Details</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe your question in detail. Include what you have tried and where you are stuck."
            rows={8}
            className="w-full rounded-[var(--radius-sm)] border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-y"
          />
          {content.length > 0 && content.length < 20 && (
            <p className="text-xs text-error">Details must be at least 20 characters</p>
          )}
          <p className="text-xs text-on-surface-variant">{content.length}/20 minimum characters</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-on-surface">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-10 rounded-[var(--radius-sm)] border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            >
              <option value="">Select subject</option>
              {SUBJECTS.map(s => (
                <option key={s} value={s}>{SUBJECT_LABELS[s]}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-on-surface">Grade</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="h-10 rounded-[var(--radius-sm)] border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
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

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
          <Link href="/forum">
            <Button variant="ghost" size="md">Cancel</Button>
          </Link>
          <Button variant="primary" size="md" iconLeft={<Send className="h-4 w-4" />} loading={isSubmitting} disabled={!canSubmit}>
            Post Question
          </Button>
        </div>
      </form>
    </div>
  );
}