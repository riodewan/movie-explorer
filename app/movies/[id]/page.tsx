import Image from 'next/image';
import { notFound } from 'next/navigation';
import { backdropUrl, formatDate, getMovieDetails, posterUrl } from '@/lib/tmdb';

type PageProps = { params: { id: string } };

export async function generateMetadata({ params }: PageProps) {
  const movie = await getMovieDetails(params.id);
  if (!movie) return { title: 'Film Tidak Ditemukan' };
  return { title: `${movie.title} — Movie Explorer`, description: movie.overview };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const movie = await getMovieDetails(params.id);
  if (!movie) notFound();

  const bg = backdropUrl(movie.backdrop_path, 'w1280');
  const poster = posterUrl(movie.poster_path, 'w500');

  return (
    <article className="overflow-hidden rounded-xl border bg-white">
      {/* Backdrop Header */}
      <div className="relative h-64 w-full sm:h-80">
        {bg ? (
          <Image src={bg} alt={movie.title} fill className="object-cover" priority />
        ) : (
          <div className="h-full w-full bg-gray-100" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content */}
      <div className="px-4 pb-6 sm:px-6">
        <div className="-mt-16 flex gap-4 sm:-mt-24">
          {poster ? (
            <div className="relative h-40 w-28 overflow-hidden rounded-lg border bg-white sm:h-60 sm:w-40">
              <Image src={poster} alt={movie.title} fill className="object-cover" />
            </div>
          ) : (
            <div className="h-40 w-28 rounded-lg border bg-gray-100 sm:h-60 sm:w-40" />
          )}

          <div className="flex-1">
            <h1 className="mb-1 text-2xl font-bold sm:text-3xl">{movie.title}</h1>
            <p className="text-sm text-gray-600">
              Rilis: {formatDate(movie.release_date)} · Durasi: {movie.runtime ? `${movie.runtime} mnt` : '-'} · ⭐ {movie.vote_average?.toFixed(1) ?? '-'}
            </p>
            {movie.genres?.length ? (
              <p className="mt-1 text-sm text-gray-600">Genre: {movie.genres.map(g => g.name).join(', ')}</p>
            ) : null}
          </div>
        </div>

        {movie.tagline ? <p className="mt-4 italic text-gray-700">“{movie.tagline}”</p> : null}

        <div className="prose prose-sm mt-4 max-w-none">
          <h2>Sinopsis</h2>
          <p>{movie.overview || 'Tidak ada ringkasan.'}</p>
        </div>

        {movie.homepage ? (
          <a
            href={movie.homepage}
            target="_blank"
            className="mt-4 inline-block rounded-md border px-4 py-2 hover:bg-gray-50"
          >
            Situs Resmi
          </a>
        ) : null}
      </div>
    </article>
  );
}