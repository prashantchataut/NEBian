export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-primary text-on-primary font-bold text-lg">
              N
            </div>
            <span className="text-xl font-semibold text-on-surface tracking-tight">NEBians</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}