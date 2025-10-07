import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/lib/types';
import { posterUrl, formatDate } from '@/lib/tmdb';

export default function MovieCard({ movie }: { movie: Movie }) {
  const title = movie.title || movie.name || 'Untitled';
  const poster = posterUrl(movie.poster_path, 'w342');

  return (
    <Link href={`/movies/${movie.id}`} className="group overflow-hidden rounded-xl border bg-white hover:shadow-md">
      <div className="relative aspect-[2/3] w-full">
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">No Image</div>
        )}
      </div>
      <div className="space-y-1 p-3">
        <h3 className="line-clamp-1 font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">
          {formatDate(movie.release_date || movie.first_air_date)} · ⭐ {movie.vote_average?.toFixed(1) ?? '-'}
        </p>
      </div>
    </Link>
  );
}