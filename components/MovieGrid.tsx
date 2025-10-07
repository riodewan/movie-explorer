import { Movie } from '@/lib/types';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  if (!movies?.length) return <p className="text-gray-500">Tidak ada data.</p>;
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
    </div>
  );
}