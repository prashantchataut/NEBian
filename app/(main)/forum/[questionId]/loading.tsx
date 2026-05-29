export default function QuestionLoading() {
  return (
    <div className="px-4 lg:px-6 py-6 max-w-3xl mx-auto space-y-6">
      <div className="space-y-3">
        <div className="h-7 w-3/4 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-surface-container-high rounded-[var(--radius-full)] animate-pulse-slow" />
          <div className="h-4 w-24 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
          <div className="h-4 w-16 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
          <div className="h-4 w-5/6 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
          <div className="h-4 w-2/3 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
        </div>
      </div>
      <div className="h-px bg-outline-variant" />
      <div className="space-y-4">
        <div className="h-5 w-32 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-[var(--radius-md)] border border-outline-variant p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-surface-container-high rounded-[var(--radius-full)] animate-pulse-slow shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-28 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
                <div className="h-3 w-full bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
                <div className="h-3 w-3/4 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
