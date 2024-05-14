import { Endpoints } from "utils/constants";
import { CastModel } from "types/models/cast";
import { PageFetchParams, PageData, DetailsPageData } from "types/models/common";
import { MovieModel } from "types/models/movie";
import { api } from "../api";

const movieApi = api.injectEndpoints({
  endpoints: builder => ({
    getUpcomingMovies: builder.query<MovieModel[], PageFetchParams>({
      query: (params: PageFetchParams) => `${Endpoints.upcoming}?language=en-US&page=${params.page}`,
      transformResponse: (response: PageData<MovieModel>) => response.results,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg?.page !== previousArg?.page,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'UpcomingMovies' as const, id })),
            { type: 'UpcomingMovies', id: 'LIST' },
          ]
          : [{ type: 'UpcomingMovies', id: 'LIST' }],
    }),
    getPopularMovies: builder.query<MovieModel[], PageFetchParams>({
      query: (params: PageFetchParams) => `${Endpoints.popular}?language=en-US&page=${params.page}`,
      transformResponse: (response: PageData<MovieModel>) => response.results,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems)
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg?.page !== previousArg?.page,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'PopularMovies' as const, id })),
            { type: 'PopularMovies', id: 'LIST' },
          ]
          : [{ type: 'PopularMovies', id: 'LIST' }],
    }),
    getMovieDetails: builder.query<MovieModel, PageFetchParams>({
      query: (params: PageFetchParams) => `${Endpoints.details}/${params.id}`,
      transformResponse: (response: MovieModel) => response,
      providesTags: (result) => [{ type: 'PopularMovies' as const, id: result?.id }]
    }),
    getCastsFromMovie: builder.query<CastModel[], PageFetchParams>({
      query: (params: PageFetchParams) => `${Endpoints.details}/${params.id}/credits`,
      transformResponse: (response: DetailsPageData<CastModel>) => response.cast,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Casts' as const, id })),
            { type: 'Casts', id: 'LIST' },
          ]
          : [{ type: 'Casts', id: 'LIST' }],
    }),
  })
})

export const {
  useGetUpcomingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetMovieDetailsQuery,
  useGetCastsFromMovieQuery
} = movieApi;