import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import { getPopularMovies } from '@/lib/tmdb';

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams?.page || '1');
  const data = await getPopularMovies(page);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">Sedang Populer</h1>
      <MovieGrid movies={data.results} />
      <Pagination page={data.page} totalPages={data.total_pages} basePath="/" />
    </section>
  );
}