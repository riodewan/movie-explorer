import MovieGrid from "@/components/MovieGrid";
import Pagination from "@/components/Pagination";
import { searchMovies } from "@/lib/tmdb";

type SP = { [key: string]: string | string[] | undefined };
type SearchParamsPromise = Promise<SP>;

export default async function SearchPage({ searchParams }: { searchParams: SearchParamsPromise }) {
  const sp = await searchParams;                            // ⟵ WAJIB
  const raw = sp.query;
  const pageRaw = sp.page;

  const query = Array.isArray(raw) ? raw.join(" ") : (raw || "").trim();
  const page = Number(Array.isArray(pageRaw) ? pageRaw[0] : pageRaw || "1") || 1;

  if (!query) {
    return <p style={{ color: "var(--muted)" }}>Masukkan kata kunci di kolom pencarian.</p>;
  }

  const data = await searchMovies(query, page);

  return (
    <section className="container-max surface g-border p-5">
      <h1 className="mb-4 text-xl">
        Hasil untuk: <span className="font-semibold">“{query}”</span>
      </h1>
      <MovieGrid movies={data.results} />
      <Pagination page={data.page} totalPages={data.total_pages} basePath="/search" params={{ query }} />
    </section>
  );
}