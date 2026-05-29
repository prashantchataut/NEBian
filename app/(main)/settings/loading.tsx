export default function SettingsLoading() {
  return (
    <div className="px-4 lg:px-6 py-6 max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="h-7 w-32 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
        <div className="h-4 w-64 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
      </div>
      <div className="rounded-[var(--radius-md)] border border-outline-variant p-4 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="space-y-1.5">
              <div className="h-4 w-28 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
              <div className="h-3 w-44 bg-surface-container-high rounded-[var(--radius-sm)] animate-pulse-slow" />
            </div>
            <div className="h-6 w-12 bg-surface-container-high rounded-[var(--radius-full)] animate-pulse-slow" />
          </div>
        ))}
      </div>
    </div>
  );
}
