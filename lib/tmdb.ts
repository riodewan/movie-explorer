import { PagedResponse, Movie, MovieDetails } from './types';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_LANG = process.env.TMDB_API_LANG || 'id-ID';

function buildUrl(path: string, params: Record<string, string | number | boolean | undefined> = {}) {
  if (!API_KEY) {
    throw new Error('TMDB_API_KEY tidak ditemukan. Pastikan .env.local berisi TMDB_API_KEY dan server di-restart.');
  }

  // Pastikan tidak ada leading/trailing slash yang bikin /3 hilang
  const safeBase = BASE_URL.replace(/\/+$/, '');           // hapus / di akhir
  const safePath = path.replace(/^\/+/, '');               // hapus / di awal
  const url = new URL(`${safeBase}/${safePath}`);

  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', String(DEFAULT_LANG));
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.set(k, String(v));
  });

  return url.toString();
}

const REVALIDATE_SEC = 600;

export async function getPopularMovies(page = 1) {
  const url = buildUrl('movie/popular', { page }); // <— tanpa slash awal
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SEC } });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to fetch popular movies (status ${res.status}). ${text}`);
  }
  return (await res.json()) as PagedResponse<Movie>;
}

export async function searchMovies(query: string, page = 1) {
  const url = buildUrl('search/movie', { query, include_adult: false, page });
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to search movies (status ${res.status}).`);
  return (await res.json()) as PagedResponse<Movie>;
}

export async function getMovieDetails(id: string | number) {
  const url = buildUrl(`movie/${id}`);
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SEC } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch movie details (status ${res.status}).`);
  return (await res.json()) as MovieDetails;
}

export function posterUrl(path: string | null, size: 'w92'|'w154'|'w185'|'w342'|'w500'|'w780'|'original' = 'w500') {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}

export function backdropUrl(path: string | null, size: 'w300'|'w780'|'w1280'|'original' = 'w1280') {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}

export function formatDate(d?: string) {
  if (!d) return '-';
  try {
    return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return d; }
}

export async function getByCategory(category: "popular" | "now_playing" | "top_rated" | "upcoming", page = 1) {
  const url = buildUrl(`movie/${category}`, { page });
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SEC } });
  if (!res.ok) throw new Error(`Failed to fetch ${category} movies (status ${res.status}).`);
  return (await res.json()) as PagedResponse<Movie>;
}