import MovieCardSkeleton from "@/components/MovieCardSkeleton";

export default function Loading() {
  return (
    <section>
      <div className="mb-6 h-7 w-48 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => <MovieCardSkeleton key={i} />)}
      </div>
    </section>
  );
}