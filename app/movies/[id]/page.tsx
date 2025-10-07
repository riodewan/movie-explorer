import Image from "next/image";
import { notFound } from "next/navigation";
import TrailerPlayer from "@/components/TrailerPlayer";
import {
  getMovieDetails,
  getMovieVideos,
  pickBestYouTubeTrailer,
  backdropUrl,
  posterUrl,
  formatDate,
} from "@/lib/tmdb";

type PageParams = Promise<{ id: string }>;
type PageProps = { params: PageParams };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  if (!movie) return { title: "Film Tidak Ditemukan" };
  return {
    title: `${movie.title} — Movie Explorer`,
    description: movie.overview,
  };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [movie, videos] = await Promise.all([
    getMovieDetails(id),
    getMovieVideos(id),
  ]);
  if (!movie) notFound();

  const bg = backdropUrl(movie.backdrop_path, "w1280");
  const poster = posterUrl(movie.poster_path, "w500");
  const youtubeKey = pickBestYouTubeTrailer(videos);

  return (
    <div className="container-max">
      <article className="surface g-border overflow-hidden">
        <div className="relative h-[42vh] min-h-[260px]">
          {bg ? (
            <Image
              src={bg}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full skel" />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, var(--bg) 15%, transparent)",
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-[auto,1fr]">
          <div className="row-start-1 -mt-16 justify-self-center sm:row-span-2 sm:justify-self-start">
            <div
              className="g-border surface overflow-hidden"
              style={{ width: 160, height: 240 }}
            >
              {poster ? (
                <Image
                  src={poster}
                  alt={movie.title}
                  width={160}
                  height={240}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full skel" />
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold">{movie.title}</h1>
            <p style={{ color: "var(--muted)" }}>
              Rilis: {formatDate(movie.release_date)} · Durasi:{" "}
              {movie.runtime ? `${movie.runtime} mnt` : "-"} · ⭐
              {movie.vote_average?.toFixed(1) ?? "-"}
            </p>
            {movie.genres?.length ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {movie.genres.map((g) => (
                  <span key={g.id} className="chip">
                    {g.name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <TrailerPlayer youtubeKey={youtubeKey} />
            {!youtubeKey && (
              <span className="chip">Trailer tidak tersedia</span>
            )}
            {movie.homepage ? (
              <a className="btn" href={movie.homepage} target="_blank">
                Situs Resmi
              </a>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <h2 className="mb-1 text-lg font-semibold">Sinopsis</h2>
            <p
              style={{
                color: "color-mix(in oklab, var(--fg) 85%, transparent)",
              }}
            >
              {movie.overview || "Tidak ada ringkasan."}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}