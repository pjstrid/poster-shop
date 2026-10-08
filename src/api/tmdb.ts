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

export const GENRE_IDS = { adventure: 12, scifi: 878 } as const;

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

export type ListKey = "top" | "upcoming" | "adventure" | "scifi";
export function getList(key: ListKey, page = 1) {
  switch (key) {
    case "top":
      return getTopRated(page);
    case "upcoming":
      return getUpcoming(page);
    case "adventure":
      return discoverByGenre(GENRE_IDS.adventure, page);
    case "scifi":
      return discoverByGenre(GENRE_IDS.scifi, page);
  }
}
