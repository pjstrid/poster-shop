import type { TmdbMovie } from "@/types/tmdb";

type MockMovie = TmdbMovie & { director: string; overview: string };

/*** TMDB genre-id:n:
 * Action 28, Adventure 12, Animation 16, Comedy 35,
 * Crime 80, Drama 18, Fantasy 14, Horror 27, Music 10402,
 * Romance 10749, Sci-Fi 878, Thriller 53
 */

export const MOVIES: MockMovie[] = [
  {
    id: 335984,
    title: "Blade Runner 2049",
    release_date: "2017-10-04",
    poster_path: null,
    director: "Denis Villeneuve",
    overview:
      "A young blade runner uncovers a long-buried secret that could plunge what remains of society into chaos, and sets out to find a former blade runner who has been missing for thirty years.",
  },
];
