import { create } from 'zustand';
import type { Question } from '@/types';

interface ForumState {
  questions: Question[];
  sortBy: 'newest' | 'most-liked' | 'unanswered';
  setQuestions: (questions: Question[]) => void;
  setSortBy: (sortBy: 'newest' | 'most-liked' | 'unanswered') => void;
  toggleLike: (questionId: string) => void;
}

export const useForumStore = create<ForumState>((set) => ({
  questions: [],
  sortBy: 'newest',
  setQuestions: (questions) => set({ questions }),
  setSortBy: (sortBy) => set({ sortBy }),
  toggleLike: (questionId) => set((state) => ({
    questions: state.questions.map((q) =>
      q.id === questionId
        ? { ...q, isLikedByMe: !q.isLikedByMe, likesCount: q.isLikedByMe ? q.likesCount - 1 : q.likesCount + 1 }
        : q
    ),
  })),
}));