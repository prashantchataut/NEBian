import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 animate-fade-in">
      <div className="text-7xl font-bold text-on-surface-variant/30 select-none">404</div>
      <h1 className="text-xl font-semibold text-on-surface">Page not found</h1>
      <p className="text-sm text-on-surface-variant text-center max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center h-10 px-6 rounded-[var(--radius-full)] bg-primary text-on-primary text-sm font-medium hover:bg-primary-dark active:bg-primary-dark/90 transition-[background-color] duration-[var(--transition-fast)]"
      >
        Back to Home
      </Link>
    </div>
  );
}