export interface TmdbMovie {
  id: number;
  title: string;
  release_date: string; // '2017-10-04' → only year = release_date.slice(0, 4)
  poster_path: string | null;
}

export interface TmdbDetails extends TmdbMovie {
  credits: { crew: { job: string; name: string }[] }; // To get the Director from the data
}

export interface Paged<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
