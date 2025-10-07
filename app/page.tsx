import MovieGrid from "@/components/MovieGrid";
import Pagination from "@/components/Pagination";
import SectionHeader from "@/components/SectionHeader";
import CategoryTabs from "@/components/CategoryTabs";
import { getByCategory } from "@/lib/tmdb";

type HomeSearchParams = Promise<{ page?: string; category?: string }>;

export default async function Home({ searchParams }: { searchParams: HomeSearchParams }) {
  const sp = await searchParams;
  const page = Number(sp?.page ?? "1");
  const category = (sp?.category as any) ?? "popular";

  const data = await getByCategory(category, page);

  return (
    <section className="container-max">
      <div className="mb-6 surface g-border p-5">
        <SectionHeader title="Explore Film" subtitle="Pilih kategori & temukan judul terbaik" />
        <CategoryTabs />
        <MovieGrid movies={data.results} />
        <Pagination page={data.page} totalPages={data.total_pages} basePath="/" params={{ category }} />
      </div>
    </section>
  );
}