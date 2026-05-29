'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import Fuse from 'fuse.js';
import type { Resource, Question } from '@/types';
import { SUBJECT_LABELS, GRADE_LABELS, RESOURCE_TYPE_LABELS, SUBJECT_COLORS, RESOURCE_TYPE_COLORS } from '@/types';

const mockResources: Resource[] = [
  { id: '1', title: 'Physics Grade 11 Textbook', description: 'Complete NEB physics textbook for Grade 11 students', subject: 'Physics', grade: 'Grade11', type: 'Textbook', fileUrl: '/papers/physics-11.pdf', fileSize: 15728640, thumbnailUrl: null, pageCount: 320, downloadCount: 1245, createdAt: '2025-01-15', updatedAt: '2025-01-15' },
  { id: '2', title: 'Chemistry Grade 12 Notes', description: 'Comprehensive chemistry notes for NEB exam preparation', subject: 'Chemistry', grade: 'Grade12', type: 'Notes', fileUrl: '/papers/chem-12.pdf', fileSize: 5242880, thumbnailUrl: null, pageCount: 85, downloadCount: 892, createdAt: '2025-02-01', updatedAt: '2025-02-01' },
  { id: '3', title: 'Mathematics Grade 11 Past Paper 2080', description: 'NEB Mathematics past paper with solutions', subject: 'Mathematics', grade: 'Grade11', type: 'PastPaper', fileUrl: '/papers/math-11-pp.pdf', fileSize: 2097152, thumbnailUrl: null, pageCount: 24, downloadCount: 2341, createdAt: '2025-03-10', updatedAt: '2025-03-10' },
  { id: '4', title: 'Biology Grade 12 Practice Set', description: 'Practice problems for NEB Biology Grade 12', subject: 'Biology', grade: 'Grade12', type: 'PracticeSet', fileUrl: '/papers/bio-12-ps.pdf', fileSize: 3145728, thumbnailUrl: null, pageCount: 48, downloadCount: 567, createdAt: '2025-04-05', updatedAt: '2025-04-05' },
  { id: '5', title: 'English Grade 10 Textbook', description: 'NEB English textbook for SEE preparation', subject: 'English', grade: 'Grade10', type: 'Textbook', fileUrl: '/papers/eng-10.pdf', fileSize: 10485760, thumbnailUrl: null, pageCount: 200, downloadCount: 3100, createdAt: '2025-01-20', updatedAt: '2025-01-20' },
  { id: '6', title: 'Nepali Grade 11 Notes', description: 'Detailed notes for NEB Nepali subject', subject: 'Nepali', grade: 'Grade11', type: 'Notes', fileUrl: '/papers/nep-11.pdf', fileSize: 4194304, thumbnailUrl: null, pageCount: 120, downloadCount: 780, createdAt: '2025-02-15', updatedAt: '2025-02-15' },
];

const mockQuestions: Question[] = [
  { id: '1', authorId: '1', author: { id: '1', name: 'Ram Sharma', email: 'ram@test.com', avatarUrl: null, grade: 'Grade11', createdAt: '2025-01-01' }, title: 'How to solve projectile motion problems in Physics?', content: 'I am struggling with projectile motion problems, especially the ones involving range and maximum height.', subject: 'Physics', grade: 'Grade11', tags: ['mechanics', 'projectile'], likesCount: 12, answersCount: 5, isLikedByMe: false, createdAt: '2025-05-28T10:00:00Z', updatedAt: '2025-05-28T10:00:00Z' },
  { id: '2', authorId: '2', author: { id: '2', name: 'Sita Poudel', email: 'sita@test.com', avatarUrl: null, grade: 'Grade12', createdAt: '2025-01-01' }, title: 'Organic chemistry reaction mechanisms for NEB exam', content: 'Which reaction mechanisms are most important for the NEB chemistry exam?', subject: 'Chemistry', grade: 'Grade12', tags: ['organic', 'mechanisms'], likesCount: 8, answersCount: 3, isLikedByMe: true, createdAt: '2025-05-27T14:00:00Z', updatedAt: '2025-05-27T14:00:00Z' },
  { id: '3', authorId: '3', author: { id: '3', name: 'Hari Thapa', email: 'hari@test.com', avatarUrl: null, grade: 'Grade11', createdAt: '2025-01-01' }, title: 'Integration techniques for NEB Mathematics', content: 'What are the most common integration techniques asked in NEB exams?', subject: 'Mathematics', grade: 'Grade11', tags: ['calculus', 'integration'], likesCount: 15, answersCount: 7, isLikedByMe: false, createdAt: '2025-05-26T09:00:00Z', updatedAt: '2025-05-26T09:00:00Z' },
  { id: '4', authorId: '4', author: { id: '4', name: 'Maya Gurung', email: 'maya@test.com', avatarUrl: null, grade: 'Grade12', createdAt: '2025-01-01' }, title: 'Best resources for NEB Biology preparation?', content: 'Looking for recommendations on the best textbooks and practice materials for NEB Biology Grade 12.', subject: 'Biology', grade: 'Grade12', tags: ['resources', 'preparation'], likesCount: 20, answersCount: 9, isLikedByMe: true, createdAt: '2025-05-25T16:00:00Z', updatedAt: '2025-05-25T16:00:00Z' },
];

type SearchResult = {
  id: string;
  type: 'resource' | 'question';
  title: string;
  description: string;
  href: string;
  subject?: string;
  grade?: string;
  resourceType?: string;
};

const RECENT_SEARCHES_KEY = 'nebians-recent-searches';
const MAX_RECENT = 5;

function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
  } catch {
    return [];
  }
}

function addRecentSearch(query: string) {
  try {
    const recent = getRecentSearches().filter((s) => s !== query);
    recent.unshift(query);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
  } catch {}
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const resourceFuse = useRef(new Fuse(mockResources, {
    keys: [{ name: 'title', weight: 0.5 }, { name: 'description', weight: 0.3 }, { name: 'subject', weight: 0.2 }],
    threshold: 0.4,
  }));

  const questionFuse = useRef(new Fuse(mockQuestions, {
    keys: [{ name: 'title', weight: 0.5 }, { name: 'content', weight: 0.3 }, { name: 'tags', weight: 0.2 }],
    threshold: 0.4,
  }));

  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
      setRecentSearches(getRecentSearches());
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setSelectedIndex(-1);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    const resourceResults = resourceFuse.current.search(value).map((r) => ({
      id: r.item.id,
      type: 'resource' as const,
      title: r.item.title,
      description: r.item.description,
      href: `/resources/${r.item.id}`,
      subject: r.item.subject,
      grade: r.item.grade,
      resourceType: r.item.type,
    }));
    const questionResults = questionFuse.current.search(value).map((r) => ({
      id: r.item.id,
      type: 'question' as const,
      title: r.item.title,
      description: r.item.content,
      href: `/forum/${r.item.id}`,
      subject: r.item.subject ?? undefined,
      grade: r.item.grade ?? undefined,
    }));
    setResults([...resourceResults, ...questionResults]);
  }, []);

  const handleSelect = useCallback((result: SearchResult) => {
    addRecentSearch(query);
    onClose();
    router.push(result.href);
  }, [query, onClose, router]);

  const handleNavigate = useCallback((e: React.KeyboardEvent) => {
    const totalItems = results.length > 0 ? results.length : recentSearches.length > 0 ? recentSearches.length : 0;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0 && selectedIndex >= 0) {
        handleSelect(results[selectedIndex]);
      } else if (query.trim()) {
        addRecentSearch(query);
        onClose();
        router.push(`/resources?q=${encodeURIComponent(query.trim())}`);
      }
    }
  }, [results, recentSearches, selectedIndex, query, handleSelect, onClose, router]);

  const handleRecentClick = (term: string) => {
    setQuery(term);
    handleSearch(term);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm animate-fade-in" onClick={onClose} aria-hidden="true" />
      <div
        ref={listRef}
        className="relative w-full max-w-lg mx-4 bg-surface-container-lowest rounded-[var(--radius-lg)] shadow-[var(--elevation-3)] animate-scale-in overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Search resources and questions"
      >
        <div className="flex items-center gap-3 px-4 border-b border-outline-variant">
          <Search className="h-5 w-5 text-on-surface-variant shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleNavigate}
            placeholder="Search resources, questions..."
            className="flex-1 h-12 bg-transparent text-on-surface text-sm placeholder:text-on-surface-variant/60 focus:outline-none"
            aria-label="Search"
          />
          <kbd className="hidden sm:inline-flex items-center h-5 px-1.5 rounded-[var(--radius-sm)] bg-surface-container-high text-[10px] font-medium text-on-surface-variant border border-outline-variant">
            ESC
          </kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {results.length > 0 && (
            <ul role="listbox" aria-label="Search results">
              {results.map((result, index) => (
                <li
                  key={`${result.type}-${result.id}`}
                  role="option"
                  aria-selected={index === selectedIndex}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-[background-color] duration-[var(--transition-fast)] ${
                    index === selectedIndex ? 'bg-surface-container-high' : 'hover:bg-surface-container'
                  }`}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] shrink-0 ${
                    result.type === 'resource' ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'
                  }`}>
                    {result.type === 'resource' ? <FileText className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-on-surface truncate">{result.title}</p>
                    <p className="text-xs text-on-surface-variant truncate">{result.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-on-surface-variant shrink-0 opacity-0 group-hover:opacity-100" />
                </li>
              ))}
            </ul>
          )}

          {results.length === 0 && query.trim() && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Search className="h-8 w-8 text-on-surface-variant mb-2" />
              <p className="text-sm text-on-surface">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-on-surface-variant mt-1">Try a different search term</p>
            </div>
          )}

          {results.length === 0 && !query.trim() && recentSearches.length > 0 && (
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2">Recent searches</p>
              <ul>
                {recentSearches.map((term) => (
                  <li
                    key={term}
                    className="flex items-center gap-3 py-2 cursor-pointer hover:bg-surface-container rounded-[var(--radius-sm)] px-2 transition-[background-color] duration-[var(--transition-fast)]"
                    onClick={() => handleRecentClick(term)}
                  >
                    <Clock className="h-4 w-4 text-on-surface-variant shrink-0" />
                    <span className="text-sm text-on-surface truncate">{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.length === 0 && !query.trim() && recentSearches.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Search className="h-8 w-8 text-on-surface-variant mb-2" />
              <p className="text-sm text-on-surface-variant">Start typing to search</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-on-surface-variant">
                <kbd className="inline-flex items-center h-5 px-1.5 rounded-[var(--radius-sm)] bg-surface-container-high border border-outline-variant font-medium">Ctrl</kbd>
                <span>+</span>
                <kbd className="inline-flex items-center h-5 px-1.5 rounded-[var(--radius-sm)] bg-surface-container-high border border-outline-variant font-medium">K</kbd>
                <span>to search anytime</span>
              </div>
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-2 border-t border-outline-variant text-xs text-on-surface-variant">
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center h-4 px-1 rounded-[var(--radius-sm)] bg-surface-container-high border border-outline-variant text-[10px] font-medium">Enter</kbd>
              to select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center h-4 px-1 rounded-[var(--radius-sm)] bg-surface-container-high border border-outline-variant text-[10px] font-medium">Up/Down</kbd>
              to navigate
            </span>
          </div>
        )}
      </div>
    </div>
  );
}