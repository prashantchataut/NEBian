'use client';

import { useEffect } from 'react';

export default function ForumError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 px-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-[var(--radius-full)] bg-error-light">
        <span className="text-error text-lg font-semibold">!</span>
      </div>
      <h2 className="text-lg font-semibold text-on-surface">Failed to load forum</h2>
      <p className="text-sm text-on-surface-variant text-center max-w-sm">Something went wrong while loading the forum. Please try again.</p>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center h-10 px-6 rounded-[var(--radius-full)] bg-primary text-on-primary text-sm font-medium hover:bg-primary-dark transition-colors"
      >
        Try again
      </button>
    </div>
  );
}