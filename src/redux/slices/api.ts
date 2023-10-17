import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Endpoints, base_uri, token } from '../../util/constants'
import { DetailsPageData, PageData, PageFetchParams } from '../../models/common';
import { Movie } from '../../models/movie';
import { Cast } from '../../models/cast';

export const apiSlice = createApi({
  keepUnusedDataFor: Infinity,
  baseQuery: fetchBaseQuery({
    baseUrl: base_uri,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: builder => ({
    getUpcomingMovies: builder.query<Movie[], PageFetchParams>({
      query: (params: PageFetchParams) => `${Endpoints.upcoming}?language=${params.language}&page=${params.page}`,
      transformResponse: (response: PageData<Movie>) => response.results,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      keepUnusedDataFor: Infinity,
    }),
    getPopularMovies: builder.query<Movie[], PageFetchParams>({
      query: (params: PageFetchParams) => `${Endpoints.popular}?language=${params.language}&page=${params.page}`,
      transformResponse: (response: PageData<Movie>) => response.results,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      keepUnusedDataFor: Infinity,
    }),
    getMovieDetails: builder.query<Movie, PageFetchParams>({
      query: (params: PageFetchParams) => `${Endpoints.details}/${params.id}`,
      transformResponse: (response: Movie) => response,
      keepUnusedDataFor: Infinity,
    }),
    getCastsFromMovie: builder.query<Cast[], PageFetchParams>({
      query: (params: PageFetchParams) => `${Endpoints.details}/${params.id}/credits`,
      transformResponse: (response: DetailsPageData<Cast>) => response.cast,
      keepUnusedDataFor: Infinity,
    }),
  })
})

export const { useGetUpcomingMoviesQuery, useGetPopularMoviesQuery, useGetMovieDetailsQuery, useGetCastsFromMovieQuery } = apiSlice