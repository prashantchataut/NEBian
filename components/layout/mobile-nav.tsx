'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/nav';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-t border-outline-variant pb-[env(safe-area-inset-bottom)]" role="navigation" aria-label="Mobile navigation">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 transition-[color] duration-[var(--transition-fast)] ${
                isActive ? 'text-primary' : 'text-on-surface-variant'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={`relative ${isActive ? '' : ''}`}>
                <item.icon className="h-5 w-5" />
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
                )}
              </div>
              <span className={`text-[10px] font-medium leading-none ${isActive ? 'text-primary' : ''}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}