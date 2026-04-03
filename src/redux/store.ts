import { configureStore } from '@reduxjs/toolkit';
import { mealApi } from './mealApi';

export const store = configureStore({
  reducer: {
    [mealApi.reducerPath]: mealApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mealApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
