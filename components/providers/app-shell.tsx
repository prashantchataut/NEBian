'use client';

import { useEffect } from 'react';
import { OfflineBanner } from '@/hooks/use-offline-status';

export function AppShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  return (
    <>
      {children}
      <OfflineBanner />
    </>
  );
}