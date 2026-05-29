export default function MainLoading() {
  return (
    <div className="min-h-dvh bg-background">
      <div className="hidden lg:flex lg:flex-col lg:w-[260px] lg:fixed lg:inset-y-0 lg:left-0 border-r border-outline-variant bg-surface-container-low">
        <div className="flex items-center h-16 px-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[var(--radius-md)] animate-shimmer" />
            <div className="w-16 h-5 rounded-[var(--radius-sm)] animate-shimmer" />
          </div>
        </div>
        <div className="flex-1 px-3 py-2 space-y-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5">
              <div className="w-5 h-5 rounded-[var(--radius-sm)] animate-shimmer" />
              <div className="w-20 h-4 rounded-[var(--radius-sm)] animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
      <div className="lg:pl-[260px]">
        <div className="sticky top-0 z-40 flex items-center justify-between h-14 px-4 lg:px-6 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
          <div className="flex-1 max-w-md">
            <div className="h-10 w-full rounded-[var(--radius-full)] animate-shimmer" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-10 h-10 rounded-[var(--radius-full)] animate-shimmer" />
            <div className="w-10 h-10 rounded-[var(--radius-full)] animate-shimmer" />
          </div>
        </div>
        <main className="px-4 lg:px-6 py-6 max-w-5xl mx-auto space-y-6">
          <div className="space-y-2">
            <div className="h-7 w-40 rounded-[var(--radius-sm)] animate-shimmer" />
            <div className="h-4 w-64 rounded-[var(--radius-sm)] animate-shimmer" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 rounded-[var(--radius-md)] border border-outline-variant bg-surface">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] animate-shimmer" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 w-16 rounded-[var(--radius-sm)] animate-shimmer" />
                    <div className="h-3 w-12 rounded-[var(--radius-sm)] animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-[var(--radius-md)] border border-outline-variant bg-surface">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] animate-shimmer shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded-[var(--radius-sm)] animate-shimmer" />
                    <div className="h-3 w-1/2 rounded-[var(--radius-sm)] animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}