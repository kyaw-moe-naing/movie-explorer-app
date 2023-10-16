import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Endpoints, Tab, UIStatus } from "../../util/constants"
import Http from "../../networking/http"
import { Movie } from "../../models/movie";
import { initAppState } from "../../models/app";
import { RootState } from '../store';
import { DetailsPageData, PageData } from '../../models/common';
import { Cast } from '../../models/cast';

export const getUpcomingMovies = createAsyncThunk(Endpoints.upcoming, async (page: number) => {
  const response = await Http.get<PageData<Movie>>(Endpoints.upcoming, { page: page, language: 'en-US' });
  return response.data.results;
});

export const getPopularMovies = createAsyncThunk(Endpoints.popular, async (page: number) => {
  const response = await Http.get<PageData<Movie>>(Endpoints.popular, { page: page, language: 'en-US' });
  return response.data.results;
});

export const getMovieDetails = createAsyncThunk(Endpoints.details, async (id: number) => {
  const response = await Http.getByID<Movie>(`${Endpoints.details}/${id}`, { language: 'en-US' });
  const credits = await Http.get<DetailsPageData<Cast>>(`${Endpoints.details}/${id}/credits`, { language: 'en-US' });
  return {
    ...response.data,
    cast: credits.data.cast,
    crew: credits.data.crew,
  };
});

const app = createSlice({
  name: 'app',
  initialState: initAppState,
  reducers: {
    setTab: (state, action: PayloadAction<Tab>) => {
      state.page = 1;
      state.movies = [];
      state.tab = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    addToFavourite: (state, action: PayloadAction<number>) => {
      state.favourites = state.favourites.concat(action.payload);
    },
    removeFromFavourite: (state, action: PayloadAction<number>) => {
      const index = state.favourites.indexOf(action.payload, 0);
      if (index > -1) {
        state.favourites = state.favourites.splice(index + 1, 1);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUpcomingMovies.pending, state => {
        if (state.page == 1) {
          state.listUI = UIStatus.LOADING
        }
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.listUI = UIStatus.SUCCESS
        state.movies = state.movies.concat(action.payload)
      })
      .addCase(getUpcomingMovies.rejected, (state, action) => {
        state.listUI = UIStatus.FAILED
        state.error = action.error.message
      })
      .addCase(getPopularMovies.pending, state => {
        if (state.page == 1) {
          state.listUI = UIStatus.LOADING
        }
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.listUI = UIStatus.SUCCESS
        state.movies = state.movies.concat(action.payload)
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.listUI = UIStatus.FAILED
        state.error = action.error.message
      })
      .addCase(getMovieDetails.pending, state => {
        state.detailsUI = UIStatus.LOADING
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.detailsUI = UIStatus.SUCCESS
        state.movie = action.payload
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.detailsUI = UIStatus.FAILED
        state.error = action.error.message
      })
  },
});

export const getTab = (state: RootState) => state.tab;
export const getMovies = (state: RootState) => state.movies;
export const getPage = (state: RootState) => state.page;
export const getListUIStatus = (state: RootState) => state.listUI;
export const getError = (state: RootState) => state.error;

export const getDetailsUIStatus = (state: RootState) => state.detailsUI;
export const getMovie = (state: RootState) => state.movie;

export const getFavourites = (state: RootState) => state.favourites;

export const { setTab, setPage, addToFavourite, removeFromFavourite } = app.actions;
export default app.reducer;