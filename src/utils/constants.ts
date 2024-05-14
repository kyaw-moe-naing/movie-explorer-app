export const TOKEN: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDQxYWMzZmVhMjQzNmY1YmJhMGRhYzBmMDE1YzAyNiIsInN1YiI6IjY1MmNkMGQ4NzJjMTNlMDBlMjNmNGZiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1HbF1gqs2PTj1zbA9it_nOpGbWSCJm0utbYSvEo-sKA';

export const BASE_URL: string = 'https://api.themoviedb.org/3';

export const IMAGE_BASE_URL: string = 'https://image.tmdb.org/t/p/original';

export const Endpoints = {
  upcoming: `/movie/upcoming`,
  popular: `/movie/popular`,
  details: `/movie`,
};

export const GOOGLE_SIGN_IN_WEB_CLIENT_ID = '412574812768-15i7i5pa93b7fmu5dki4u67bqiunvsh4.apps.googleusercontent.com';

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