import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SeafoodListResponse, MealDetailsResponse } from '../types/recipe';

export const mealApi = createApi({
  reducerPath: 'mealApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.themealdb.com/api/json/v1/1/',
  }),
  endpoints: (builder) => ({
    getSeafoodMeals: builder.query<SeafoodListResponse, void>({
      query: () => 'filter.php?c=Seafood',
    }),
    getMealDetails: builder.query<MealDetailsResponse, string>({
      query: (mealId) => `lookup.php?i=${mealId}`,
    }),
    searchMealByName: builder.query<SeafoodListResponse, string>({
      query: (mealName) => `search.php?s=${mealName}`,
    }),
  }),
});

export const {
  useGetSeafoodMealsQuery,
  useGetMealDetailsQuery,
  useSearchMealByNameQuery,
} = mealApi;
