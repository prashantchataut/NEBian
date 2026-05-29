import { create } from 'zustand';
import type { Resource, Subject, Grade, ResourceType } from '@/types';

interface ResourceState {
  resources: Resource[];
  selectedSubjects: Subject[];
  selectedGrades: Grade[];
  selectedTypes: ResourceType[];
  search: string;
  setResources: (resources: Resource[]) => void;
  toggleSubject: (subject: Subject) => void;
  toggleGrade: (grade: Grade) => void;
  toggleType: (type: ResourceType) => void;
  setSearch: (search: string) => void;
  clearFilters: () => void;
}

export const useResourceStore = create<ResourceState>((set) => ({
  resources: [],
  selectedSubjects: [],
  selectedGrades: [],
  selectedTypes: [],
  search: '',
  setResources: (resources) => set({ resources }),
  toggleSubject: (subject) => set((state) => ({
    selectedSubjects: state.selectedSubjects.includes(subject)
      ? state.selectedSubjects.filter((s) => s !== subject)
      : [...state.selectedSubjects, subject],
  })),
  toggleGrade: (grade) => set((state) => ({
    selectedGrades: state.selectedGrades.includes(grade)
      ? state.selectedGrades.filter((g) => g !== grade)
      : [...state.selectedGrades, grade],
  })),
  toggleType: (type) => set((state) => ({
    selectedTypes: state.selectedTypes.includes(type)
      ? state.selectedTypes.filter((t) => t !== type)
      : [...state.selectedTypes, type],
  })),
  setSearch: (search) => set({ search }),
  clearFilters: () => set({ selectedSubjects: [], selectedGrades: [], selectedTypes: [], search: '' }),
}));