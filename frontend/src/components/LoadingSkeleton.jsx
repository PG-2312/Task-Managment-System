export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5 animate-pulse-soft">
      <div className="h-3 w-2/3 bg-surface-700 rounded mb-4" />
      <div className="h-2 w-full bg-surface-800 rounded mb-2" />
      <div className="h-2 w-4/5 bg-surface-800 rounded mb-4" />
      <div className="flex items-center gap-2 mt-4">
        <div className="h-5 w-16 bg-surface-800 rounded-full" />
        <div className="h-5 w-12 bg-surface-800 rounded-full" />
      </div>
    </div>
  );
}

export function KanbanSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-xl border border-surface-800 bg-surface-900/30 p-4">
          <div className="h-4 w-24 bg-surface-700 rounded mb-4 animate-pulse-soft" />
          {[...Array(3)].map((_, j) => (
            <div
              key={j}
              className="rounded-lg border border-surface-800 bg-surface-900/50 p-4 mb-3 animate-pulse-soft"
            >
              <div className="h-3 w-3/4 bg-surface-700 rounded mb-3" />
              <div className="h-2 w-1/2 bg-surface-800 rounded mb-2" />
              <div className="flex gap-2 mt-3">
                <div className="h-5 w-14 bg-surface-800 rounded-full" />
                <div className="h-5 w-14 bg-surface-800 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5 animate-pulse-soft">
      <div className="h-3 w-20 bg-surface-700 rounded mb-3" />
      <div className="h-8 w-12 bg-surface-800 rounded" />
    </div>
  );
}
