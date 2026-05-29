import type { Resource, Question, Answer, Notification, User } from '@/types';
import { api } from './api';

const USE_MOCK = !process.env.NEXT_PUBLIC_API_URL;

const mockResources: Resource[] = [
  { id: '1', title: 'Physics Grade 11 Textbook', description: 'Complete NEB physics textbook for Grade 11 students covering mechanics, thermodynamics, optics, and modern physics.', subject: 'Physics', grade: 'Grade11', type: 'Textbook', fileUrl: '/papers/physics-11.pdf', fileSize: 15728640, thumbnailUrl: null, pageCount: 320, downloadCount: 1245, createdAt: '2025-01-15', updatedAt: '2025-01-15' },
  { id: '2', title: 'Chemistry Grade 12 Notes', description: 'Comprehensive chemistry notes for NEB exam preparation', subject: 'Chemistry', grade: 'Grade12', type: 'Notes', fileUrl: '/papers/chem-12.pdf', fileSize: 5242880, thumbnailUrl: null, pageCount: 85, downloadCount: 892, createdAt: '2025-02-01', updatedAt: '2025-02-01' },
  { id: '3', title: 'Mathematics Grade 11 Past Paper 2080', description: 'NEB Mathematics past paper with solutions', subject: 'Mathematics', grade: 'Grade11', type: 'PastPaper', fileUrl: '/papers/math-11-pp.pdf', fileSize: 2097152, thumbnailUrl: null, pageCount: 24, downloadCount: 2341, createdAt: '2025-03-10', updatedAt: '2025-03-10' },
  { id: '4', title: 'Biology Grade 12 Practice Set', description: 'Practice problems for NEB Biology Grade 12', subject: 'Biology', grade: 'Grade12', type: 'PracticeSet', fileUrl: '/papers/bio-12-ps.pdf', fileSize: 3145728, thumbnailUrl: null, pageCount: 48, downloadCount: 567, createdAt: '2025-04-05', updatedAt: '2025-04-05' },
  { id: '5', title: 'English Grade 10 Textbook', description: 'NEB English textbook for SEE preparation', subject: 'English', grade: 'Grade10', type: 'Textbook', fileUrl: '/papers/eng-10.pdf', fileSize: 10485760, thumbnailUrl: null, pageCount: 200, downloadCount: 3100, createdAt: '2025-01-20', updatedAt: '2025-01-20' },
  { id: '6', title: 'Nepali Grade 11 Notes', description: 'Detailed notes for NEB Nepali subject', subject: 'Nepali', grade: 'Grade11', type: 'Notes', fileUrl: '/papers/nep-11.pdf', fileSize: 4194304, thumbnailUrl: null, pageCount: 120, downloadCount: 780, createdAt: '2025-02-15', updatedAt: '2025-02-15' },
];

const mockQuestions: Question[] = [
  { id: '1', authorId: '1', author: { id: '1', name: 'Ram Sharma', email: 'ram@test.com', avatarUrl: null, grade: 'Grade11', createdAt: '2025-01-01' }, title: 'How to solve projectile motion problems in Physics?', content: 'I am struggling with projectile motion problems, especially the ones involving range and maximum height. Can someone explain the approach?', subject: 'Physics', grade: 'Grade11', tags: ['mechanics', 'projectile'], likesCount: 12, answersCount: 5, isLikedByMe: false, createdAt: '2025-05-28T10:00:00Z', updatedAt: '2025-05-28T10:00:00Z' },
  { id: '2', authorId: '2', author: { id: '2', name: 'Sita Poudel', email: 'sita@test.com', avatarUrl: null, grade: 'Grade12', createdAt: '2025-01-01' }, title: 'Organic chemistry reaction mechanisms for NEB exam', content: 'Which reaction mechanisms are most important for the NEB chemistry exam? Aldol condensation or Cannizzaro?', subject: 'Chemistry', grade: 'Grade12', tags: ['organic', 'mechanisms'], likesCount: 8, answersCount: 3, isLikedByMe: true, createdAt: '2025-05-27T14:00:00Z', updatedAt: '2025-05-27T14:00:00Z' },
  { id: '3', authorId: '3', author: { id: '3', name: 'Hari Thapa', email: 'hari@test.com', avatarUrl: null, grade: 'Grade11', createdAt: '2025-01-01' }, title: 'Integration techniques for NEB Mathematics', content: 'What are the most common integration techniques asked in NEB exams? Integration by parts, substitution, or partial fractions?', subject: 'Mathematics', grade: 'Grade11', tags: ['calculus', 'integration'], likesCount: 15, answersCount: 7, isLikedByMe: false, createdAt: '2025-05-26T09:00:00Z', updatedAt: '2025-05-26T09:00:00Z' },
  { id: '4', authorId: '4', author: { id: '4', name: 'Maya Gurung', email: 'maya@test.com', avatarUrl: null, grade: 'Grade12', createdAt: '2025-01-01' }, title: 'Best resources for NEB Biology preparation?', content: 'Looking for recommendations on the best textbooks and practice materials for NEB Biology Grade 12.', subject: 'Biology', grade: 'Grade12', tags: ['resources', 'preparation'], likesCount: 20, answersCount: 9, isLikedByMe: true, createdAt: '2025-05-25T16:00:00Z', updatedAt: '2025-05-25T16:00:00Z' },
];

export const resourceService = {
  getAll: async (params?: { subject?: string; grade?: string; type?: string; search?: string }): Promise<Resource[]> => {
    if (USE_MOCK) {
      let filtered = [...mockResources];
      if (params?.subject) filtered = filtered.filter(r => r.subject === params.subject);
      if (params?.grade) filtered = filtered.filter(r => r.grade === params.grade);
      if (params?.type) filtered = filtered.filter(r => r.type === params.type);
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
      }
      return filtered;
    }
    return api.get<Resource[]>('/resources/', params as Record<string, string>);
  },

  getById: async (id: string): Promise<Resource> => {
    if (USE_MOCK) {
      const resource = mockResources.find(r => r.id === id);
      if (!resource) throw new Error('Resource not found');
      return resource;
    }
    return api.get<Resource>(`/resources/${id}/`);
  },
};

export const forumService = {
  getQuestions: async (params?: { subject?: string; grade?: string; sort?: string; search?: string }): Promise<Question[]> => {
    if (USE_MOCK) {
      let filtered = [...mockQuestions];
      if (params?.subject) filtered = filtered.filter(q => q.subject === params.subject);
      if (params?.grade) filtered = filtered.filter(q => q.grade === params.grade);
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(q2 => q2.title.toLowerCase().includes(q) || q2.content.toLowerCase().includes(q));
      }
      if (params?.sort === 'most-liked') filtered.sort((a, b) => b.likesCount - a.likesCount);
      else if (params?.sort === 'unanswered') filtered.sort((a, b) => a.answersCount - b.answersCount);
      else filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return filtered;
    }
    return api.get<Question[]>('/forum/questions/', params as Record<string, string>);
  },

  getQuestion: async (id: string): Promise<Question> => {
    if (USE_MOCK) {
      const question = mockQuestions.find(q => q.id === id);
      if (!question) throw new Error('Question not found');
      return question;
    }
    return api.get<Question>(`/forum/questions/${id}/`);
  },

  createQuestion: async (data: { title: string; content: string; subject?: string; grade?: string; tags?: string[] }): Promise<Question> => {
    if (USE_MOCK) {
      return { id: Date.now().toString(), authorId: 'current', author: { id: 'current', name: 'You', email: 'you@test.com', avatarUrl: null, grade: 'Grade11', createdAt: new Date().toISOString() }, ...data, likesCount: 0, answersCount: 0, isLikedByMe: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as Question;
    }
    return api.post<Question>('/forum/questions/', data);
  },
};

export const notificationService = {
  getAll: async (): Promise<Notification[]> => {
    if (USE_MOCK) {
      return [
        { id: '1', userId: '1', type: 'answer' as const, title: 'New answer on your question', content: 'Sita Poudel answered "How to solve projectile motion problems?"', link: '/forum/1', read: false, createdAt: '2025-05-29T08:00:00Z' },
        { id: '2', userId: '1', type: 'like' as const, title: 'Your answer was liked', content: 'Hari Thapa liked your answer about integration techniques', link: '/forum/3', read: false, createdAt: '2025-05-29T06:00:00Z' },
        { id: '3', userId: '1', type: 'announcement' as const, title: 'New resources available', content: 'NEB 2081 past papers have been uploaded for all subjects', link: '/resources', read: true, createdAt: '2025-05-28T14:00:00Z' },
      ];
    }
    return api.get<Notification[]>('/notifications/');
  },

  markAsRead: async (id: string): Promise<void> => {
    if (USE_MOCK) return;
    return api.patch<void>(`/notifications/${id}/`, { read: true });
  },
};