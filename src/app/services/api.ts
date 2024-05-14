import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, TOKEN } from 'utils/constants';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  tagTypes: [
    'UpcomingMovies',
    'PopularMovies',
    'Casts'
  ],
  endpoints: () => ({})
});