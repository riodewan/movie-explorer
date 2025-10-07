export default function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white dark:bg-white/5 dark:border-white/10">
      <div className="aspect-[2/3] w-full animate-pulse bg-gray-200 dark:bg-white/10" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
      </div>
    </div>
  );
}