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
    genre_ids: [878, 18],
    poster_path: null,
    director: "Denis Villeneuve",
    overview:
      "A young blade runner uncovers a long-buried secret that could plunge what remains of society into chaos, and sets out to find a former blade runner who has been missing for thirty years.",
  },
  {
    id: 238,
    title: "The Godfather",
    release_date: "1972-03-14",
    genre_ids: [80, 18],
    poster_path: null,
    director: "Francis Ford Coppola",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.",
  },
  {
    id: 680,
    title: "Pulp Fiction",
    release_date: "1994-09-10",
    genre_ids: [80, 53],
    poster_path: null,
    director: "Quentin Tarantino",
    overview:
      "The lives of two hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
  },
  {
    id: 496243,
    title: "Parasite",
    release_date: "2019-05-30",
    genre_ids: [53, 18],
    poster_path: null,
    director: "Bong Joon Ho",
    overview:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
  },
  {
    id: 129,
    title: "Spirited Away",
    release_date: "2001-07-20",
    genre_ids: [16, 14],
    poster_path: null,
    director: "Hayao Miyazaki",
    overview:
      "During her family move, a sullen ten-year-old wanders into a world ruled by gods, witches and spirits, where humans are changed into beasts.",
  },
  {
    id: 157336,
    title: "Interstellar",
    release_date: "2014-11-05",
    genre_ids: [878, 12],
    poster_path: null,
    director: "Christopher Nolan",
    overview:
      "When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity’s survival.",
  },
  {
    id: 76341,
    title: "Mad Max: Fury Road",
    release_date: "2015-05-13",
    genre_ids: [28, 12],
    poster_path: null,
    director: "George Miller",
    overview:
      "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the aid of a drifter named Max.",
  },
  {
    id: 120467,
    title: "The Grand Budapest Hotel",
    release_date: "2014-02-26",
    genre_ids: [35, 18],
    poster_path: null,
    director: "Wes Anderson",
    overview:
      "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy.",
  },
  {
    id: 64690,
    title: "Drive",
    release_date: "2011-09-15",
    genre_ids: [80, 18],
    poster_path: null,
    director: "Nicolas Winding Refn",
    overview:
      "A mysterious Hollywood stuntman and mechanic moonlights as a getaway driver and finds himself in trouble when he helps out his neighbour.",
  },
  {
    id: 348,
    title: "Alien",
    release_date: "1979-05-25",
    genre_ids: [27, 878],
    poster_path: null,
    director: "Ridley Scott",
    overview:
      "The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission.",
  },
  {
    id: 289,
    title: "Casablanca",
    release_date: "1942-11-26",
    genre_ids: [10749, 18],
    poster_path: null,
    director: "Michael Curtiz",
    overview:
      "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis.",
  },
  {
    id: 103,
    title: "Taxi Driver",
    release_date: "1976-02-08",
    genre_ids: [80, 18],
    poster_path: null,
    director: "Martin Scorsese",
    overview:
      "A mentally unstable veteran works as a night-time taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action.",
  },
  {
    id: 693134,
    title: "Dune: Part Two",
    release_date: "2024-02-27",
    genre_ids: [878, 12],
    poster_path: null,
    director: "Denis Villeneuve",
    overview:
      "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
  },
  {
    id: 194,
    title: "Amélie",
    release_date: "2001-04-25",
    genre_ids: [35, 10749],
    poster_path: null,
    director: "Jean-Pierre Jeunet",
    overview:
      "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
  },
  {
    id: 313369,
    title: "La La Land",
    release_date: "2016-12-01",
    genre_ids: [10402, 10749],
    poster_path: null,
    director: "Damien Chazelle",
    overview:
      "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
  },
];
