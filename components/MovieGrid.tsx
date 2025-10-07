import { Movie } from "@/lib/types";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  if (!movies?.length) {
    return <p style={{color:"var(--muted)"}}>Tidak ada data.</p>;
  }
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map(m => <MovieCard key={m.id} movie={m} />)}
    </div>
  );
}