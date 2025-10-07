import MovieGrid from "@/components/MovieGrid";
import Pagination from "@/components/Pagination";
import GenreFilter from "@/components/GenreFilter";
import { discoverMovies, getGenres } from "@/lib/tmdb";

type SP = Promise<{ page?: string; genres?: string }>;

export default async function DiscoverPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const page = Number(sp?.page ?? "1");
  const genres = (sp?.genres || "").split(",").filter(Boolean).join(",") || undefined;

  const [genreList, data] = await Promise.all([
    getGenres(),
    discoverMovies({ page, with_genres: genres }),
  ]);

  return (
    <section className="container-max surface g-border p-5">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Discover</h1>
        <p style={{ color: "var(--muted)" }}>
          Filter berdasarkan genre. Klik genre untuk toggle.
        </p>
      </div>

      <div className="mb-5">
        <GenreFilter genres={genreList} />
      </div>

      <MovieGrid movies={data.results} />
      <Pagination
        page={data.page}
        totalPages={data.total_pages}
        basePath="/discover"
        params={{ genres: genres || "" }}
      />
    </section>
  );
}