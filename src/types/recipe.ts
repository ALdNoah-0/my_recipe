export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  [key: string]: string | null | undefined; // For ingredients and measures
}

export interface MealListResponse {
  meals: Meal[] | null;
}

export interface MealDetailsResponse {
  meals: Meal[] | null;
}

export interface SeafoodMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface SeafoodListResponse {
  meals: SeafoodMeal[] | null;
}

export interface CuisineItem {
  strArea: string;
}

export interface CuisineListResponse {
  meals: CuisineItem[] | null;
}

export interface CategoryItem {
  strCategory: string;
}

export interface CategoryListResponse {
  meals: CategoryItem[] | null;
}
