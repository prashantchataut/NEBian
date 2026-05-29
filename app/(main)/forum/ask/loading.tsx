export default function AskLoading() {
  return (
    <div className="px-4 lg:px-6 py-6 max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="h-7 w-40 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
        <div className="h-4 w-56 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-16 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
          <div className="h-12 w-full bg-surface-container-high rounded-[var(--radius-md)] animate-pulse-slow" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
          <div className="h-32 w-full bg-surface-container-high rounded-[var(--radius-md)] animate-pulse-slow" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-20 bg-surface-container-high rounded-[var(--radius-md)] animate-pulse-slow" />
          <div className="h-10 w-20 bg-surface-container-high rounded-[var(--radius-md)] animate-pulse-slow" />
        </div>
      </div>
    </div>
  );
}
