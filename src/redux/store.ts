import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import app from './slices/app';
import { apiSlice } from './slices/api';

export const store = configureStore({
  reducer: {
    app: app,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;