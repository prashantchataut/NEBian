'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 px-4 animate-scale-in">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-error-container">
        <span className="text-on-error-container text-xl font-bold">!</span>
      </div>
      <h2 className="text-lg font-semibold text-on-surface">Something went wrong</h2>
      <p className="text-sm text-on-surface-variant text-center max-w-sm">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center h-10 px-6 rounded-[var(--radius-full)] bg-primary text-on-primary text-sm font-medium hover:bg-primary-dark active:bg-primary-dark/90 transition-[background-color] duration-[var(--transition-fast)]"
      >
        Try again
      </button>
    </div>
  );
}