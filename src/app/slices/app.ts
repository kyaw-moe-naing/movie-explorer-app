import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { initAppState } from 'types/models/app';

const app = createSlice({
  name: 'app',
  initialState: initAppState,
  reducers: {
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


export const getFavourites = (state: RootState) => state.app.favourites;

export const { addToFavourite, removeFromFavourite } = app.actions;
export default app.reducer;