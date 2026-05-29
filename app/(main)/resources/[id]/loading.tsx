export default function ResourceDetailLoading() {
  return (
    <div className="px-4 lg:px-6 py-6 max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="h-7 w-3/4 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
        <div className="flex items-center gap-3">
          <div className="h-5 w-16 bg-surface-container-high rounded-[var(--radius-full)] animate-pulse-slow" />
          <div className="h-5 w-16 bg-surface-container-high rounded-[var(--radius-full)] animate-pulse-slow" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-surface-container-high rounded-[var(--radius-full)] animate-pulse-slow" />
          <div className="h-4 w-24 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-10 bg-surface-container-high rounded-[var(--radius-full)] animate-pulse-slow" />
          <div className="h-10 w-10 bg-surface-container-high rounded-[var(--radius-full)] animate-pulse-slow" />
        </div>
      </div>
      <div className="aspect-[3/4] max-w-md mx-auto bg-surface-container-high rounded-[var(--radius-md)] animate-pulse-slow" />
    </div>
  );
}
