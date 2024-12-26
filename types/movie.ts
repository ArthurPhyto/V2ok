export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genres: string[];
  release_date: string;
  runtime: number;
  cast: { name: string }[];
  trailer_url: string;
  title_seo: string;
  meta_description_seo: string;
  vote_average: number;
}

export interface Category {
  id: number;
  name: string;
}