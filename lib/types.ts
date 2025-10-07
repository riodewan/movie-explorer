// lib/types.ts
export type Movie = {
  id: number;
  title: string;
  name?: string;           // untuk tv/alternative
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  overview: string;
};

export type PagedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type MovieDetails = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number | null;
  genres: { id: number; name: string }[];
  vote_average: number;
  overview: string;
  homepage?: string | null;
  status?: string;
  tagline?: string | null;
};
