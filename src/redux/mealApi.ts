import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  SeafoodListResponse,
  MealDetailsResponse,
  CuisineListResponse,
  CategoryListResponse,
} from '../types/recipe';

export const mealApi = createApi({
  reducerPath: 'mealApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.themealdb.com/api/json/v1/1/',
  }),
  endpoints: (builder) => ({
    getSeafoodMeals: builder.query<SeafoodListResponse, void>({
      query: () => 'filter.php?c=Seafood',
    }),
    getCuisines: builder.query<CuisineListResponse, void>({
      query: () => 'list.php?a=list',
    }),
    getMealsByCuisine: builder.query<SeafoodListResponse, string>({
      query: (cuisine) => `filter.php?a=${encodeURIComponent(cuisine)}`,
    }),
    getCategories: builder.query<CategoryListResponse, void>({
      query: () => 'list.php?c=list',
    }),
    getMealsByCategory: builder.query<SeafoodListResponse, string>({
      query: (category) => `filter.php?c=${encodeURIComponent(category)}`,
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
  useGetCuisinesQuery,
  useGetMealsByCuisineQuery,
  useGetCategoriesQuery,
  useGetMealsByCategoryQuery,
  useGetMealDetailsQuery,
  useSearchMealByNameQuery,
} = mealApi;
