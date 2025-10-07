import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import { searchMovies } from '@/lib/tmdb';

export default async function SearchPage({ searchParams }: { searchParams: { query?: string; page?: string } }) {
  const query = (searchParams.query || '').trim();
  const page = Number(searchParams.page || '1');

  if (!query) {
    return <p>Masukkan kata kunci di kolom pencarian.</p>;
  }

  const data = await searchMovies(query, page);

  return (
    <section>
      <h1 className="mb-4 text-xl">
        Hasil untuk: <span className="font-semibold">&quot;{query}&quot;</span>
      </h1>
      <MovieGrid movies={data.results} />
      <Pagination page={data.page} totalPages={data.total_pages} basePath="/search" params={{ query }} />
    </section>
  );
}