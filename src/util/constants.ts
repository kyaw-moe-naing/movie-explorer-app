export const token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDQxYWMzZmVhMjQzNmY1YmJhMGRhYzBmMDE1YzAyNiIsInN1YiI6IjY1MmNkMGQ4NzJjMTNlMDBlMjNmNGZiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1HbF1gqs2PTj1zbA9it_nOpGbWSCJm0utbYSvEo-sKA';

export const base_uri: string = 'https://api.themoviedb.org/3';

export const image_base_uri: string = 'https://image.tmdb.org/t/p/original';

export const Endpoints = {
  upcoming: `${base_uri}/movie/upcoming`,
  popular: `${base_uri}/movie/popular`,
  details: `${base_uri}/movie`,
};

export enum UIStatus {
  IDLE,
  LOADING,
  SUCCESS,
  FAILED
}

export enum Tab {
  UPCOMING = 'Upcoming',
  POPULAR = 'Popular'
}