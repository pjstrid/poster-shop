import { Paged, TmdbDetails, TmdbMovie } from "@/types/tmdb";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.EXPO_PUBLIC_TMDB_KEY;

async function request<T>(
  path: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  const all = {
    api_key: API_KEY ?? "",
    language: "en-US",
    include_adult: "false",
    ...params,
  };

  const query = Object.entries(all)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&");

  const res = await fetch(`${BASE_URL}${path}?${query}`);

  if (!res.ok) {
    throw new Error(`TMDB error ${res.status}`);
  }

  return (await res.json()) as T;
}

export const GENRES = [
  { key: "action", label: "Action", id: 28 },
  { key: "adventure", label: "Adventure", id: 12 },
  { key: "animation", label: "Animation", id: 16 },
  { key: "comedy", label: "Comedy", id: 35 },
  { key: "crime", label: "Crime", id: 80 },
  { key: "drama", label: "Drama", id: 18 },
  { key: "fantasy", label: "Fantasy", id: 14 },
  { key: "horror", label: "Horror", id: 27 },
  { key: "music", label: "Music", id: 10402 },
  { key: "romance", label: "Romance", id: 10749 },
  { key: "scifi", label: "Sci-Fi", id: 878 },
  { key: "thriller", label: "Thriller", id: 53 },
] as const;

export function getTopRated(page = 1) {
  return request<Paged<TmdbMovie>>("/movie/top_rated", { page });
}

export function getUpcoming(page = 1) {
  return request<Paged<TmdbMovie>>("/movie/upcoming", { page });
}

export function discoverByGenre(genreId: number, page = 1) {
  return request<Paged<TmdbMovie>>("/discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
    page,
  });
}

export function searchMovies(query: string, page = 1) {
  return request<Paged<TmdbMovie>>("/search/movie", { query, page });
}

export function getDetails(id: number | string) {
  return request<TmdbDetails>(`/movie/${id}`, {
    append_to_response: "credits",
  });
}

export type GenreKey = (typeof GENRES)[number]["key"];

export type ListKey = "top" | "upcoming" | GenreKey;
export function getList(key: ListKey, page = 1) {
  if (key === "top") return getTopRated(page);
  if (key === "upcoming") return getUpcoming(page);

  const genre = GENRES.find((genre) => genre.key === key)!;
  return discoverByGenre(genre.id, page);
}
