'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const mockQuestion = {
  id: '1',
  title: 'How to solve projectile motion problems in Physics?',
};

export default function AnswerPage() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canSubmit = content.length >= 20;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="px-4 lg:px-6 py-6 max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/forum/${mockQuestion.id}`} className="inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors group">
          <ArrowLeft className="h-5 w-5 text-on-surface transition-transform group-hover:-translate-x-0.5" />
        </Link>
        <h1 className="text-xl font-semibold text-on-surface tracking-tight">Write Answer</h1>
      </div>

      <Card variant="outlined" padding="default" className="mb-6">
        <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Answering</p>
        <h2 className="text-sm font-medium text-on-surface">{mockQuestion.title}</h2>
      </Card>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Textarea
          label="Your Answer"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your answer here. Be detailed and explain your reasoning. You can use step-by-step solutions."
          error={content.length > 0 && content.length < 20 ? 'Answer must be at least 20 characters' : undefined}
          helperText={`${content.length}/20 minimum characters`}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
          <Link href={`/forum/${mockQuestion.id}`}>
            <Button variant="ghost" size="md">Cancel</Button>
          </Link>
          <Button variant="primary" size="md" iconLeft={<Send className="h-4 w-4" />} loading={isSubmitting} disabled={!canSubmit}>
            Post Answer
          </Button>
        </div>
      </form>
    </div>
  );
}