'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, CheckCircle2, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SUBJECT_COLORS, SUBJECT_LABELS, GRADE_LABELS, type Question, type Answer } from '@/types';
import { forumService } from '@/lib/services';

export default function QuestionDetailPage() {
  const params = useParams();
  const questionId = params.questionId as string;

  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const fetchQuestion = () => {
    setIsLoading(true);
    setError(null);
    forumService.getQuestion(questionId)
      .then((data) => {
        setQuestion(data);
        setIsLiked(data.isLikedByMe);
        setLikeCount(data.likesCount);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load question'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchQuestion();
  }, [questionId]);

  if (isLoading) {
    return (
      <div className="px-4 lg:px-6 py-6 max-w-4xl mx-auto animate-fade-in">
        <div className="h-4 w-24 rounded bg-surface-container-highest animate-pulse mb-6" />
        <div className="rounded-[var(--radius-md)] border border-outline-variant p-6 space-y-4 animate-pulse">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-[var(--radius-full)] bg-surface-container-highest shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-surface-container-highest rounded w-3/4" />
              <div className="h-4 bg-surface-container-highest rounded w-1/4" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-surface-container-highest rounded w-full" />
            <div className="h-3 bg-surface-container-highest rounded w-5/6" />
            <div className="h-3 bg-surface-container-highest rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="px-4 lg:px-6 py-6 max-w-4xl mx-auto animate-fade-in">
        <Link href="/forum" className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-4 group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back to Forum
        </Link>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-[var(--radius-full)] bg-error-container mb-4">
            <AlertCircle className="h-8 w-8 text-on-error-container" />
          </div>
          <h3 className="text-base font-medium text-on-surface">Failed to load question</h3>
          <p className="text-sm text-on-surface-variant mt-1 max-w-xs">{error || 'Question not found'}</p>
          <Button variant="outline" size="md" iconLeft={<RefreshCw className="h-4 w-4" />} onClick={fetchQuestion} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-6 py-6 max-w-4xl mx-auto animate-fade-in">
      <Link href="/forum" className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-4 group">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back to Forum
      </Link>

      <Card variant="outlined" padding="spacious" className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Avatar size="lg" initials={question.author.name.split(' ').map(n => n[0]).join('')} />
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-on-surface tracking-tight">{question.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-on-surface">{question.author.name}</span>
              {question.author.grade && <span className="text-xs text-on-surface-variant">{GRADE_LABELS[question.author.grade]}</span>}
            </div>
          </div>
        </div>

        <div className="text-sm text-on-surface-variant leading-relaxed mb-4">
          {question.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-2">{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {question.subject && (
            <Badge size="sm" variant="tonal" color={SUBJECT_COLORS[question.subject]}>
              {SUBJECT_LABELS[question.subject]}
            </Badge>
          )}
          {question.grade && <Badge size="sm" variant="outlined">{GRADE_LABELS[question.grade]}</Badge>}
          {question.tags.map(tag => (
            <Badge key={tag} size="sm" variant="outlined">{tag}</Badge>
          ))}
        </div>

        <Separator />

        <div className="flex items-center gap-4 pt-3">
          <button
            onClick={() => { setIsLiked(!isLiked); setLikeCount(isLiked ? likeCount - 1 : likeCount + 1); }}
            className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors active:scale-95"
          >
            <Heart className={`h-4 w-4 transition-transform ${isLiked ? 'fill-current text-primary' : ''}`} />
            {likeCount}
          </button>
          <span className="flex items-center gap-1.5 text-sm text-on-surface-variant">
            <MessageCircle className="h-4 w-4" />
            {question.answersCount} answers
          </span>
          <button className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors ml-auto active:scale-95">
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>
      </Card>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-on-surface">{answers.length} Answers</h2>
        <Link href={`/forum/${question.id}/answer`}>
          <Button variant="primary" size="sm">Write Answer</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {answers.map(answer => (
          <Card key={answer.id} variant="outlined" padding="default" className={answer.isAccepted ? 'border-primary/50' : ''}>
            {answer.isAccepted && (
              <div className="flex items-center gap-1.5 mb-3 text-sm font-medium text-primary">
                <CheckCircle2 className="h-4 w-4" /> Accepted Answer
              </div>
            )}
            <div className="flex items-start gap-3 mb-3">
              <Avatar size="md" initials={answer.author.name.split(' ').map(n => n[0]).join('')} />
              <div>
                <span className="text-sm font-medium text-on-surface">{answer.author.name}</span>
                {answer.author.grade && <span className="text-xs text-on-surface-variant ml-2">{GRADE_LABELS[answer.author.grade]}</span>}
              </div>
            </div>
            <div className="text-sm text-on-surface-variant leading-relaxed">
              {answer.content.split('\n').map((line, i) => (
                <p key={i} className="mb-2">{line}</p>
              ))}
            </div>
            <Separator className="my-3" />
            <button className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors active:scale-95">
              <Heart className={`h-4 w-4 ${answer.isLikedByMe ? 'fill-current text-primary' : ''}`} />
              {answer.likesCount}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
