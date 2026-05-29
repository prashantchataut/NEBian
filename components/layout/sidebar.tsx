'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { navItems } from '@/lib/nav';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-[260px] lg:fixed lg:inset-y-0 lg:left-0 border-r border-outline-variant bg-surface-container-low">
      <div className="flex items-center h-16 px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)] bg-primary text-on-primary font-bold text-sm transition-transform duration-[var(--transition-fast)] group-active:scale-95">
            N
          </div>
          <span className="text-lg font-semibold text-on-surface tracking-tight">
            NEBians
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-0.5" role="navigation" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius-full)] text-sm font-medium transition-[background-color,color] duration-[var(--transition-fast)] ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'text-on-surface-variant hover:bg-surface-container-high active:bg-surface-container-highest'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className={`h-5 w-5 shrink-0 transition-colors duration-[var(--transition-fast)] ${isActive ? 'text-on-secondary-container' : ''}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-outline-variant">
        <div className="flex items-center justify-between px-4">
          <Link href="/settings" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-[var(--radius-full)] bg-primary-container flex items-center justify-center text-on-primary-container text-xs font-semibold transition-transform duration-[var(--transition-fast)] group-active:scale-95">
              U
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-on-surface leading-tight">Student</span>
              <span className="text-xs text-on-surface-variant">Grade 11</span>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}