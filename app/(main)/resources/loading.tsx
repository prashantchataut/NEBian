export default function ResourcesLoading() {
  return (
    <div className="px-4 lg:px-6 py-6 max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="h-7 w-48 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
        <div className="h-4 w-72 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
      </div>
      <div className="flex gap-3">
        <div className="h-10 flex-1 bg-surface-container-high rounded-[var(--radius-full)] animate-pulse-slow" />
        <div className="h-10 w-20 bg-surface-container-high rounded-[var(--radius-full)] animate-pulse-slow" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-[var(--radius-md)] border border-outline-variant p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-surface-container-high rounded-[var(--radius-md)] animate-pulse-slow" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
                <div className="h-3 w-1/2 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-surface-container-high rounded-[var(--radius-full)] animate-pulse-slow" />
              <div className="h-5 w-16 bg-surface-container-high rounded-[var(--radius-full)] animate-pulse-slow" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}