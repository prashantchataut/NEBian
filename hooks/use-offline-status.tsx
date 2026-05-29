'use client';

import { useEffect, useState } from 'react';

export function useOfflineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export function OfflineBanner() {
  const isOnline = useOfflineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 z-50 bg-error-light text-on-error text-center text-sm py-1.5 px-4 animate-slide-up">
      You are currently offline. Some features may be limited.
    </div>
  );
}