'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SUBJECT_COLORS, SUBJECT_LABELS, GRADE_LABELS } from '@/types';

const mockQuestion = {
  id: '1',
  author: { id: '1', name: 'Ram Sharma', username: 'ram_sharma', email: 'ram@test.com', avatarUrl: null, grade: 'Grade11' as const, stream: 'Science' as const, subjects: ['Physics', 'Chemistry', 'Mathematics'] as const, contentScope: 'MyGradeOnly' as const, province: 'Bagmati' as const, district: 'Kathmandu', school: 'Baneshwor Campus', lockProfile: false, createdAt: '2025-01-01' },
  title: 'How to solve projectile motion problems in Physics?',
  content: 'I am struggling with projectile motion problems, especially the ones involving range and maximum height. Can someone explain the approach step by step?\n\nFor example, how do I solve: A ball is thrown at an angle of 45 degrees with initial velocity of 20 m/s. Find the maximum height and range.\n\nI know the basic formulas but I keep making mistakes in applying them. Any tips would be appreciated!',
  subject: 'Physics' as const,
  grade: 'Grade11' as const,
  tags: ['mechanics', 'projectile'],
  likesCount: 12,
  answersCount: 5,
  isLikedByMe: false,
  createdAt: '2025-05-28T10:00:00Z',
};

const mockAnswers = [
  { id: 'a1', author: { id: '2', name: 'Sita Poudel', username: 'sita_poudel', email: 'sita@test.com', avatarUrl: null, grade: 'Grade12' as const, stream: 'Science' as const, subjects: ['Physics', 'Chemistry', 'Mathematics'] as const, contentScope: 'MyGradeOnly' as const, province: 'Bagmati' as const, district: 'Kathmandu', school: 'Baneshwor Campus', lockProfile: false, createdAt: '2025-01-01' }, content: 'Great question! Here is the step-by-step approach:\n\nStep 1: Break the initial velocity into components.\n- Horizontal: vx = v cos(45) = 14.14 m/s\n- Vertical: vy = v sin(45) = 14.14 m/s\n\nStep 2: For maximum height, use: H = vy^2 / (2g)\n- H = (14.14)^2 / (2 x 9.8) = 10.2 m\n\nStep 3: For range, use: R = v^2 sin(2theta) / g\n- R = (20)^2 x sin(90) / 9.8 = 40.8 m', likesCount: 8, isAccepted: true, isLikedByMe: false, createdAt: '2025-05-28T11:00:00Z' },
  { id: 'a2', author: { id: '3', name: 'Hari Thapa', username: 'hari_thapa', email: 'hari@test.com', avatarUrl: null, grade: 'Grade11' as const, stream: 'Science' as const, subjects: ['Physics', 'Chemistry', 'Mathematics'] as const, contentScope: 'MyGradeOnly' as const, province: 'Bagmati' as const, district: 'Kathmandu', school: 'Baneshwor Campus', lockProfile: false, createdAt: '2025-01-01' }, content: 'One tip I found helpful: always draw a diagram first! Label the angle, initial velocity, and mark the horizontal and vertical components. This prevents mistakes in selecting the right formula.', likesCount: 3, isAccepted: false, isLikedByMe: false, createdAt: '2025-05-28T12:30:00Z' },
];

export default function QuestionDetailPage() {
  const [isLiked, setIsLiked] = useState(mockQuestion.isLikedByMe);
  const [likeCount, setLikeCount] = useState(mockQuestion.likesCount);

  return (
    <div className="px-4 lg:px-6 py-6 max-w-4xl mx-auto animate-fade-in">
      <Link href="/forum" className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-4 group">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back to Forum
      </Link>

      <Card variant="outlined" padding="spacious" className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Avatar size="lg" initials={mockQuestion.author.name.split(' ').map(n => n[0]).join('')} />
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-on-surface tracking-tight">{mockQuestion.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-on-surface">{mockQuestion.author.name}</span>
              <span className="text-xs text-on-surface-variant">{GRADE_LABELS[mockQuestion.author.grade]}</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-on-surface-variant leading-relaxed mb-4">
          {mockQuestion.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-2">{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge size="sm" variant="tonal" color={SUBJECT_COLORS[mockQuestion.subject]}>
            {SUBJECT_LABELS[mockQuestion.subject]}
          </Badge>
          <Badge size="sm" variant="outlined">{GRADE_LABELS[mockQuestion.grade]}</Badge>
          {mockQuestion.tags.map(tag => (
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
            {mockQuestion.answersCount} answers
          </span>
          <button className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors ml-auto active:scale-95">
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>
      </Card>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-on-surface">{mockAnswers.length} Answers</h2>
        <Link href={`/forum/${mockQuestion.id}/answer`}>
          <Button variant="primary" size="sm">Write Answer</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {mockAnswers.map(answer => (
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
                <span className="text-xs text-on-surface-variant ml-2">{GRADE_LABELS[answer.author.grade]}</span>
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