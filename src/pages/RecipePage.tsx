import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useGetSeafoodMealsQuery,
  useGetMealsByCategoryQuery,
  useGetMealsByCuisineQuery,
  useSearchMealByNameQuery,
} from '../redux/mealApi';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import '../styles/MainPages.css';

const RecipePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const selectedCategory = searchParams.get('category') ?? 'All';
  const selectedCuisine = searchParams.get('cuisine') ?? 'All';
  const introSubtitle =
    selectedCuisine !== 'All' && selectedCategory !== 'All'
      ? `Showing ${selectedCuisine} cuisine recipes in the ${selectedCategory} category.`
      : selectedCuisine !== 'All'
      ? `Showing ${selectedCuisine} cuisine recipes.`
      : selectedCategory !== 'All'
        ? `Showing recipes in the ${selectedCategory} category.`
        : 'Browse all recipes by category or cuisine.';

  const { data: seafoodData, isLoading: isLoadingSeafood, error: seafoodError } = useGetSeafoodMealsQuery();
  const { data: categoryMealsData, isLoading: isLoadingCategoryMeals } = useGetMealsByCategoryQuery(selectedCategory, {
    skip: selectedCategory === 'All' || Boolean(searchQuery),
  });
  const { data: cuisineMealsData, isLoading: isLoadingCuisineMeals } = useGetMealsByCuisineQuery(selectedCuisine, {
    skip: selectedCuisine === 'All' || Boolean(searchQuery),
  });
  const { data: searchData, isLoading: isLoadingSearch } = useSearchMealByNameQuery(searchQuery, {
    skip: !searchQuery,
  });

  const isLoading = isLoadingSeafood || isLoadingSearch || isLoadingCategoryMeals || isLoadingCuisineMeals;
  const error = seafoodError;

  const meals = useMemo(() => {
    if (searchQuery && searchData?.meals) {
      return searchData.meals.filter((meal) => {
        const matchesCuisine = selectedCuisine === 'All' || ('strArea' in meal && meal.strArea === selectedCuisine);
        const matchesCategory = selectedCategory === 'All' || ('strCategory' in meal && meal.strCategory === selectedCategory);
        return matchesCuisine && matchesCategory;
      });
    }

    if (selectedCuisine !== 'All' && selectedCategory !== 'All') {
      const categoryMeals = categoryMealsData?.meals ?? [];
      const cuisineMealIds = new Set((cuisineMealsData?.meals ?? []).map((meal) => meal.idMeal));
      return categoryMeals.filter((meal) => cuisineMealIds.has(meal.idMeal));
    }

    if (selectedCuisine !== 'All') {
      return cuisineMealsData?.meals || [];
    }

    if (selectedCategory !== 'All') {
      return categoryMealsData?.meals || [];
    }

    return seafoodData?.meals || [];
  }, [searchQuery, searchData, seafoodData, selectedCategory, categoryMealsData, selectedCuisine, cuisineMealsData]);

  const getMealCategory = (meal: unknown) => {
    if (selectedCategory !== 'All') {
      return selectedCategory;
    }

    if (meal && typeof meal === 'object') {
      const maybeMeal = meal as { strCategory?: unknown; strArea?: unknown };
      const category = typeof maybeMeal.strCategory === 'string' ? maybeMeal.strCategory : '';
      const area = typeof maybeMeal.strArea === 'string' ? maybeMeal.strArea : '';

      if (searchQuery) {
        if (selectedCuisine !== 'All' && area.trim()) {
          return area;
        }
        if (selectedCategory !== 'All' && category.trim()) {
          return category;
        }
        if (category.trim()) {
          return category;
        }
      }

      if (selectedCuisine !== 'All') {
        return selectedCuisine;
      }

      if (category.trim()) {
        return category;
      }
    }

    return 'Seafood';
  };

  const filteredMeals = useMemo(() => {
    return meals;
  }, [meals]);

  const totalItems = filteredMeals.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMeals = filteredMeals.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (error) {
    return <div className="error-message">Error loading recipes. Please try again later.</div>;
  }

  return (
    <div className="main-page">
      <header className="page-header page-header-gif">
        <h1>Recipe Page</h1>
        <h2>{introSubtitle}</h2>
      </header>

      <SearchBar onSearch={handleSearch} placeholder="Search recipes by name..." />

      {isLoading && <div className="loading">Loading recipes...</div>}

      {!isLoading && currentMeals.length === 0 && (
        <div className="no-results">
          {searchQuery ? 'No recipes found matching your search.' : 'No recipes available.'}
        </div>
      )}

      <div className="recipe-grid">
        {currentMeals.map((meal) => (
          <RecipeCard 
            key={meal.idMeal} 
            id={meal.idMeal} 
            name={meal.strMeal} 
            image={meal.strMealThumb}
            category={getMealCategory(meal)}
          />
        ))}
      </div>

      {!isLoading && filteredMeals.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default RecipePage;
