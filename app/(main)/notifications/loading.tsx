export default function NotificationsLoading() {
  return (
    <div className="px-4 lg:px-6 py-6 max-w-2xl mx-auto space-y-4">
      <div className="space-y-2">
        <div className="h-7 w-40 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
        <div className="h-4 w-56 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="rounded-[var(--radius-md)] border border-outline-variant p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-surface-container-high rounded-[var(--radius-full)] animate-pulse-slow shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
              <div className="h-3 w-1/2 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
