'use client';

import { Search, Bell } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-14 px-4 lg:px-6 bg-surface border-b border-outline-variant">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
          <input
            type="search"
            placeholder="Search resources, questions..."
            className="w-full h-10 pl-10 pr-4 rounded-[var(--radius-full)] bg-surface-container-high text-on-surface text-sm placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          className="relative inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-full)] text-on-surface-variant hover:bg-surface-container-high transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error" />
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}