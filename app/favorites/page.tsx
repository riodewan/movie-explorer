"use client";

import { useEffect, useState } from "react";
import MovieGrid from "@/components/MovieGrid";

type Movie = {
  id: number; title: string; name?: string;
  poster_path: string | null; vote_average: number;
  release_date?: string; first_air_date?: string;
};

export default function FavoritesPage() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const ids: number[] = JSON.parse(localStorage.getItem("fav-movies") || "[]");
        if (!ids.length) { setMovies([]); setLoading(false); return; }
        const res = await fetch("/api/movies/batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids }),
        });
        const data = await res.json();
        setMovies(data.movies || []);
      } catch {}
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <section className="container-max surface g-border p-5">
        <h1 className="text-2xl font-bold mb-4">Favorit</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="surface g-border skel aspect-[2/3] rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container-max surface g-border p-5">
      <h1 className="text-2xl font-bold mb-4">Favorit</h1>
      {movies.length ? (
        <MovieGrid movies={movies as any} />
      ) : (
        <p style={{ color: "var(--muted)" }}>
          Belum ada film favorit. Buka halaman film lalu klik ikon hati ❤️ untuk menambahkan.
        </p>
      )}
    </section>
  );
}