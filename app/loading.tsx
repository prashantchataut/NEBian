export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-[var(--radius-sm)] border-2 border-primary border-t-transparent animate-spin" />
        <p className="text-sm text-on-surface-variant">Loading...</p>
      </div>
    </div>
  );
}