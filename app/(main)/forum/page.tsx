'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, MessageCircle, Filter, AlertCircle, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { SUBJECTS, GRADES, SUBJECT_LABELS, GRADE_LABELS, SUBJECT_COLORS, type Question } from '@/types';
import { forumService } from '@/lib/services';
import { useForumStore } from '@/stores/forum-store';

type SortOption = 'newest' | 'most-liked' | 'unanswered';

export default function ForumPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const storeSetQuestions = useForumStore((s) => s.setQuestions);

  const fetchQuestions = () => {
    setIsLoading(true);
    setError(null);
    forumService.getQuestions()
      .then((data) => {
        setQuestions(data);
        storeSetQuestions(data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load questions'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on mount
  }, []);

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  const filtered = questions.filter(q => {
    if (search && !q.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedSubjects.length && q.subject && !selectedSubjects.includes(q.subject)) return false;
    if (selectedGrades.length && q.grade && !selectedGrades.includes(q.grade)) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'most-liked') return b.likesCount - a.likesCount;
    if (sortBy === 'unanswered') return a.answersCount - b.answersCount;
    return 0;
  });

  return (
    <div className="px-4 lg:px-6 py-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-on-surface tracking-tight">Discussion Forum</h1>
          <p className="text-sm text-on-surface-variant mt-1">Ask questions, share knowledge, and help fellow students.</p>
        </div>
        <Link href="/forum/ask">
          <Button variant="primary" size="md">Ask Question</Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full h-10 pl-10 pr-4 rounded-[var(--radius-full)] bg-surface-container-high text-on-surface text-sm placeholder:text-on-surface-variant/60 border border-transparent hover:border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-[border-color,box-shadow] duration-[var(--transition-fast)]"
          />
        </div>
        <Button
          variant="outline"
          size="md"
          iconLeft={<Filter className="h-4 w-4" />}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filter
        </Button>
      </div>

      {showFilters && (
        <div className="space-y-4 p-4 rounded-[var(--radius-md)] bg-surface-container-low border border-outline-variant animate-slide-down">
          <div>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2">Subject</p>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map(s => (
                <button key={s} onClick={() => toggleFilter(selectedSubjects, setSelectedSubjects, s)} aria-pressed={selectedSubjects.includes(s)} className={`px-3 h-7 rounded-[var(--radius-full)] text-xs font-medium transition-[background-color,color] duration-[var(--transition-fast)] ${selectedSubjects.includes(s) ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest active:bg-surface-container-highest'}`}>
                  {SUBJECT_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2">Grade</p>
            <div className="flex flex-wrap gap-2">
              {GRADES.map(g => (
                <button key={g} onClick={() => toggleFilter(selectedGrades, setSelectedGrades, g)} aria-pressed={selectedGrades.includes(g)} className={`px-3 h-7 rounded-[var(--radius-full)] text-xs font-medium transition-[background-color,color] duration-[var(--transition-fast)] ${selectedGrades.includes(g) ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest active:bg-surface-container-highest'}`}>
                  {GRADE_LABELS[g]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2">Sort by</p>
            <div className="flex flex-wrap gap-2">
              {(['newest', 'most-liked', 'unanswered'] as SortOption[]).map(s => (
                <button key={s} onClick={() => setSortBy(s)} aria-pressed={sortBy === s} className={`px-3 h-7 rounded-[var(--radius-full)] text-xs font-medium transition-[background-color,color] duration-[var(--transition-fast)] ${sortBy === s ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest active:bg-surface-container-highest'}`}>
                  {s === 'most-liked' ? 'Most Liked' : s === 'unanswered' ? 'Unanswered' : 'Newest'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-[var(--radius-full)] bg-error-container mb-4">
              <AlertCircle className="h-8 w-8 text-on-error-container" />
            </div>
            <h3 className="text-base font-medium text-on-surface">Failed to load questions</h3>
            <p className="text-sm text-on-surface-variant mt-1 max-w-xs">{error}</p>
            <Button variant="outline" size="md" iconLeft={<RefreshCw className="h-4 w-4" />} onClick={fetchQuestions} className="mt-4">
              Retry
            </Button>
          </div>
        ) : isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-[var(--radius-md)] border border-outline-variant p-4 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-[var(--radius-full)] bg-surface-container-highest shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-surface-container-highest rounded w-3/4" />
                  <div className="h-3 bg-surface-container-highest rounded w-1/2" />
                </div>
              </div>
            </div>
          ))
        ) : (
          filtered.map((question, index) => (
            <Link key={question.id} href={`/forum/${question.id}`} className={`block animate-slide-up stagger-${Math.min(index + 1, 8)}`}>
              <Card variant="outlined" padding="default" interactive className="group">
                <div className="flex items-start gap-3">
                  <Avatar size="md" initials={question.author.name.split(' ').map(n => n[0]).join('')} />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors line-clamp-2">{question.title}</h3>
                    <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">{question.content}</p>
                    <div className="flex items-center gap-3 mt-2.5">
                      {question.subject && (
                        <Badge size="sm" variant="tonal" color={SUBJECT_COLORS[question.subject] || 'var(--color-outline)'}>
                          {SUBJECT_LABELS[question.subject as keyof typeof SUBJECT_LABELS]}
                        </Badge>
                      )}
                      {question.grade && <Badge size="sm" variant="outlined">{GRADE_LABELS[question.grade]}</Badge>}
                      <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                        <Heart className={`h-3 w-3 ${question.isLikedByMe ? 'fill-current text-primary' : ''}`} />
                        {question.likesCount}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                        <MessageCircle className="h-3 w-3" />
                        {question.answersCount}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>

      {!isLoading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-[var(--radius-full)] bg-surface-container-high mb-4">
            <MessageCircle className="h-8 w-8 text-on-surface-variant" />
          </div>
          <h3 className="text-base font-medium text-on-surface">No questions found</h3>
          <p className="text-sm text-on-surface-variant mt-1 max-w-xs">Be the first to ask a question!</p>
          <Link href="/forum/ask" className="mt-4">
            <Button variant="primary" size="md">Ask Question</Button>
          </Link>
        </div>
      )}
    </div>
  );
}