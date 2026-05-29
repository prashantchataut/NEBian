'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, MessageCircle, Bell, Settings } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/resources', label: 'Resources', icon: BookOpen },
  { href: '/forum', label: 'Forum', icon: MessageCircle },
  { href: '/notifications', label: 'Alerts', icon: Bell },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-[260px] lg:fixed lg:inset-y-0 lg:left-0 border-r border-outline-variant bg-surface-container-low">
      <div className="flex items-center h-16 px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-md)] bg-primary text-on-primary font-semibold text-sm">
            N
          </div>
          <span className="text-lg font-semibold text-on-surface tracking-tight">
            NEBians
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1" role="navigation" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius-full)] text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-outline-variant">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[var(--radius-full)] bg-primary-container flex items-center justify-center text-on-primary-container text-xs font-semibold">
              U
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-on-surface leading-tight">Student</span>
              <span className="text-xs text-on-surface-variant">Grade 11</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}