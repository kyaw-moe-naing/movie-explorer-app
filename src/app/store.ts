import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import app from './slices/app';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    app: app,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;