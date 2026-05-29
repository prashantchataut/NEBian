import Fuse, { type IFuseOptions } from 'fuse.js';
import type { Resource, Question } from '@/types';

const resourceOptions: IFuseOptions<Resource> = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'description', weight: 0.3 },
    { name: 'subject', weight: 0.2 },
  ],
  threshold: 0.4,
  includeScore: true,
};

const questionOptions: IFuseOptions<Question> = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'content', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
  ],
  threshold: 0.4,
  includeScore: true,
};

export function createResourceSearch(resources: Resource[]): Fuse<Resource> {
  return new Fuse(resources, resourceOptions);
}

export function createQuestionSearch(questions: Question[]): Fuse<Question> {
  return new Fuse(questions, questionOptions);
}

export function searchResources(resources: Resource[], query: string): Resource[] {
  if (!query.trim()) return resources;
  const fuse = createResourceSearch(resources);
  return fuse.search(query).map((result) => result.item);
}

export function searchQuestions(questions: Question[], query: string): Question[] {
  if (!query.trim()) return questions;
  const fuse = createQuestionSearch(questions);
  return fuse.search(query).map((result) => result.item);
}