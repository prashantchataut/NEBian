export default function ProfileLoading() {
  return (
    <div className="px-4 lg:px-6 py-6 max-w-2xl mx-auto space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-7 w-32 rounded-[var(--radius-sm)] bg-surface-container-highest" />
        <div className="h-4 w-56 rounded-[var(--radius-sm)] bg-surface-container-highest" />
      </div>
      <div className="space-y-4">
        <div className="h-10 w-full rounded-[var(--radius-sm)] bg-surface-container-highest" />
        <div className="h-10 w-full rounded-[var(--radius-sm)] bg-surface-container-highest" />
        <div className="h-10 w-full rounded-[var(--radius-sm)] bg-surface-container-highest" />
      </div>
    </div>
  );
}