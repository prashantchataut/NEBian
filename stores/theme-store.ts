import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
}

export const useThemeStore = create<ThemeState>(() => ({
  theme: 'system',
}));