import { CastModel } from "./cast";

interface GenreModel {
  id: number;
  name: string;
}

interface MovieModel {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: GenreModel[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  cast: CastModel[];
  crew: CastModel[];
}

export { type MovieModel }