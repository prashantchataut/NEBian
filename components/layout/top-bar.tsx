'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Bell, User } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { SearchDialog } from './search-dialog';

export function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between h-14 px-4 lg:px-6 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
        <div className="flex items-center gap-3 flex-1">
          <button
            type="button"
            onClick={openSearch}
            className="relative flex-1 max-w-md group"
            aria-label="Open search"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
            <div className="w-full h-10 pl-10 pr-4 rounded-[var(--radius-full)] bg-surface-container-high text-on-surface text-sm flex items-center border border-transparent hover:border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-[border-color,box-shadow] duration-[var(--transition-fast)] cursor-pointer">
              <span className="text-on-surface-variant/60">Search resources, questions...</span>
              <kbd className="hidden sm:inline-flex items-center h-5 px-1.5 ml-auto rounded-[var(--radius-sm)] bg-surface-container-highest border border-outline-variant text-[10px] font-medium text-on-surface-variant">
                Ctrl+K
              </kbd>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/notifications"
            className="relative inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-full)] text-on-surface-variant hover:bg-surface-container-high active:bg-surface-container-highest transition-[background-color] duration-[var(--transition-fast)]"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface" />
          </Link>
          <Link
            href="/settings"
            className="inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-full)] text-on-surface-variant hover:bg-surface-container-high active:bg-surface-container-highest transition-[background-color] duration-[var(--transition-fast)]"
            aria-label="Settings"
          >
            <User className="h-5 w-5" />
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </>
  );
}