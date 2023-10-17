import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Tab } from "../../util/constants"
import { initAppState } from "../../models/app";
import { RootState } from '../store';

const app = createSlice({
  name: 'app',
  initialState: initAppState,
  reducers: {
    setTab: (state, action: PayloadAction<Tab>) => {
      state.page = 1;
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
});

export const getTab = (state: RootState) => state.app.tab;
export const getPage = (state: RootState) => state.app.page;

export const getFavourites = (state: RootState) => state.app.favourites;

export const { setTab, setPage, addToFavourite, removeFromFavourite } = app.actions;
export default app.reducer;