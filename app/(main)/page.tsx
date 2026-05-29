'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Heart, ArrowRight, Clock, MessageCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SUBJECTS, SUBJECT_COLORS, SUBJECT_LABELS, type Resource, type Question } from '@/types';
import { resourceService, forumService } from '@/lib/services';

const subjectIcons: Record<string, string> = {
  Physics: 'P',
  Chemistry: 'C',
  Mathematics: 'M',
  Biology: 'B',
  English: 'E',
  Nepali: 'N',
  SocialStudies: 'S',
  ComputerScience: 'CS',
};

export default function HomePage() {
  const [recentResources, setRecentResources] = useState<Resource[]>([]);
  const [forumActivity, setForumActivity] = useState<Question[]>([]);
  const [isLoadingResources, setIsLoadingResources] = useState(true);
  const [isLoadingForum, setIsLoadingForum] = useState(true);
  const [resourcesError, setResourcesError] = useState<string | null>(null);
  const [forumError, setForumError] = useState<string | null>(null);

  const fetchResources = () => {
    setIsLoadingResources(true);
    setResourcesError(null);
    resourceService.getAll()
      .then((data) => setRecentResources(data.slice(0, 3)))
      .catch((err) => setResourcesError(err instanceof Error ? err.message : 'Failed to load resources'))
      .finally(() => setIsLoadingResources(false));
  };

  const fetchForumActivity = () => {
    setIsLoadingForum(true);
    setForumError(null);
    forumService.getQuestions({ sort: 'newest' })
      .then((data) => setForumActivity(data.slice(0, 2)))
      .catch((err) => setForumError(err instanceof Error ? err.message : 'Failed to load forum activity'))
      .finally(() => setIsLoadingForum(false));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch
    fetchResources();
    fetchForumActivity();
  }, []);

  const formatTimeAgo = (dateStr: string) => {
    const diff = new Date().getTime() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="px-4 lg:px-6 py-6 max-w-5xl mx-auto space-y-8 animate-fade-in">
      <section>
        <h1 className="text-2xl font-semibold text-on-surface tracking-tight">Welcome back</h1>
        <p className="text-sm text-on-surface-variant mt-1">Continue where you left off or explore new resources.</p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Subjects</h2>
          <Link href="/resources" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-on-primary-container transition-colors group">
            View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SUBJECTS.map((subject) => (
            <Link key={subject} href={`/resources?subject=${subject}`} className="animate-slide-up">
              <Card variant="outlined" padding="compact" interactive className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: SUBJECT_COLORS[subject] }}
                >
                  {subjectIcons[subject]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate">{SUBJECT_LABELS[subject]}</p>
                  <p className="text-xs text-on-surface-variant">Resources</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Recent Resources</h2>
          <Link href="/resources" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-on-primary-container transition-colors group">
            View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {resourcesError ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-6 w-6 text-on-error-container mb-2" />
              <p className="text-sm text-on-surface-variant">{resourcesError}</p>
              <Button variant="ghost" size="sm" iconLeft={<RefreshCw className="h-3 w-3" />} onClick={fetchResources} className="mt-2">
                Retry
              </Button>
            </div>
          ) : isLoadingResources ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-[var(--radius-md)] border border-outline-variant p-4 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-surface-container-highest shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-surface-container-highest rounded w-2/3" />
                    <div className="h-3 bg-surface-container-highest rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            recentResources.map((resource) => (
              <Link key={resource.id} href={`/resources/${resource.id}`}>
                <Card variant="outlined" padding="default" interactive>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-surface-container-high shrink-0">
                      <BookOpen className="h-5 w-5 text-on-surface-variant" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-on-surface truncate">{resource.title}</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">{resource.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge size="sm" variant="tonal" color={SUBJECT_COLORS[resource.subject]}>{SUBJECT_LABELS[resource.subject]}</Badge>
                        <Badge size="sm" variant="outlined">{resource.grade}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-on-surface-variant shrink-0">
                      <Clock className="h-3 w-3" /> {formatTimeAgo(resource.createdAt)}
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Forum Activity</h2>
          <Link href="/forum" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-on-primary-container transition-colors group">
            View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {forumError ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-6 w-6 text-on-error-container mb-2" />
              <p className="text-sm text-on-surface-variant">{forumError}</p>
              <Button variant="ghost" size="sm" iconLeft={<RefreshCw className="h-3 w-3" />} onClick={fetchForumActivity} className="mt-2">
                Retry
              </Button>
            </div>
          ) : isLoadingForum ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-[var(--radius-md)] border border-outline-variant p-4 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-full)] bg-surface-container-highest shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-surface-container-highest rounded w-3/4" />
                    <div className="h-3 bg-surface-container-highest rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            forumActivity.map((post) => (
              <Link key={post.id} href={`/forum/${post.id}`}>
                <Card variant="outlined" padding="default" interactive>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] bg-primary-container text-on-primary-container text-xs font-bold shrink-0">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-on-surface">{post.title}</h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                          <Heart className="h-3 w-3" fill={post.isLikedByMe ? 'currentColor' : 'none'} /> {post.likesCount}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                          <MessageCircle className="h-3 w-3" /> {post.answersCount} answers
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
