'use client';

import { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const mockQuestion = {
  id: '1',
  title: 'How to solve projectile motion problems in Physics?',
};

export default function AnswerPage() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canSubmit = content.length >= 20;

  return (
    <div className="px-4 lg:px-6 py-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <a href={`/forum/${mockQuestion.id}`} className="inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors">
          <ArrowLeft className="h-5 w-5 text-on-surface" />
        </a>
        <h1 className="text-xl font-semibold text-on-surface">Write Answer</h1>
      </div>

      <Card variant="outlined" padding="default" className="mb-6">
        <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Answering</p>
        <h2 className="text-sm font-medium text-on-surface">{mockQuestion.title}</h2>
      </Card>

      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); if (canSubmit) { setIsSubmitting(true); } }}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-on-surface">Your Answer</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your answer here. Be detailed and explain your reasoning. You can use step-by-step solutions."
            rows={12}
            className="w-full rounded-[var(--radius-sm)] border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-y"
          />
          {content.length > 0 && content.length < 20 && (
            <p className="text-xs text-error">Answer must be at least 20 characters</p>
          )}
          <p className="text-xs text-on-surface-variant">{content.length}/20 minimum characters</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
          <a href={`/forum/${mockQuestion.id}`}>
            <Button variant="ghost" size="md">Cancel</Button>
          </a>
          <Button variant="primary" size="md" iconLeft={<Send className="h-4 w-4" />} loading={isSubmitting} disabled={!canSubmit}>
            Post Answer
          </Button>
        </div>
      </form>
    </div>
  );
}