import { PagedResponse, Movie, MovieDetails } from "./types";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const DEFAULT_LANG = process.env.TMDB_API_LANG || "id-ID";

export type Video = {
  key: string;
  site: "YouTube" | "Vimeo";
  type: string;
  official?: boolean;
  name: string;
};

function buildUrl(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {}
) {
  if (!API_KEY) {
    throw new Error(
      "TMDB_API_KEY tidak ditemukan. Pastikan .env.local berisi TMDB_API_KEY dan server di-restart."
    );
  }

  const safeBase = BASE_URL.replace(/\/+$/, "");
  const safePath = path.replace(/^\/+/, "");
  const url = new URL(`${safeBase}/${safePath}`);

  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", String(DEFAULT_LANG));
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.set(k, String(v));
  });

  return url.toString();
}

const REVALIDATE_SEC = 600;

/* ---------- Movies: list / search / detail ---------- */

export async function getPopularMovies(page = 1) {
  const url = buildUrl("movie/popular", { page });
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SEC } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch popular movies (status ${res.status}). ${text}`
    );
  }
  return (await res.json()) as PagedResponse<Movie>;
}

export async function searchMovies(query: string, page = 1) {
  const url = buildUrl("search/movie", { query, include_adult: false, page });
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok)
    throw new Error(`Failed to search movies (status ${res.status}).`);
  return (await res.json()) as PagedResponse<Movie>;
}

export async function getMovieDetails(id: string | number) {
  const url = buildUrl(`movie/${id}`);
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SEC } });
  if (res.status === 404) return null;
  if (!res.ok)
    throw new Error(`Failed to fetch movie details (status ${res.status}).`);
  return (await res.json()) as MovieDetails;
}

export async function getByCategory(
  category: "popular" | "now_playing" | "top_rated" | "upcoming",
  page = 1
) {
  const url = buildUrl(`movie/${category}`, { page });
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SEC } });
  if (!res.ok)
    throw new Error(
      `Failed to fetch ${category} movies (status ${res.status}).`
    );
  return (await res.json()) as PagedResponse<Movie>;
}

/* ---------- Images & format ---------- */

export function posterUrl(
  path: string | null,
  size:
    | "w92"
    | "w154"
    | "w185"
    | "w342"
    | "w500"
    | "w780"
    | "original" = "w500"
) {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}

export function backdropUrl(
  path: string | null,
  size: "w300" | "w780" | "w1280" | "original" = "w1280"
) {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}

export function formatDate(d?: string) {
  if (!d) return "-";
  try {
    return new Date(d).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

/* ---------- Videos (Trailer) ---------- */

async function fetchVideosRaw(
  id: string | number,
  lang: string | null
): Promise<Video[]> {
  if (!API_KEY) return [];
  const url = new URL(`${BASE_URL}/movie/${id}/videos`);
  url.searchParams.set("api_key", API_KEY);
  if (lang) url.searchParams.set("language", lang);
  const res = await fetch(url.toString(), { next: { revalidate: 600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.results || []) as Video[];
}

export async function getMovieVideos(id: string | number) {
  const primary = await fetchVideosRaw(id, DEFAULT_LANG);
  if (primary.length) return primary;

  const fallbackEn = await fetchVideosRaw(id, "en-US");
  if (fallbackEn.length) return fallbackEn;

  return await fetchVideosRaw(id, null);
}

export function pickBestYouTubeTrailer(videos: Video[]): string | null {
  const yt = videos.filter((v) => v.site === "YouTube");
  const score = (v: Video) =>
    (/\btrailer\b/i.test(v.type) ? 3 : /\bteaser\b/i.test(v.type) ? 2 : 1) +
    (v.official ? 1 : 0) +
    (/\bofficial\b/i.test(v.name) ? 0.5 : 0);
  yt.sort((a, b) => score(b) - score(a));
  return yt[0]?.key ?? null;
}