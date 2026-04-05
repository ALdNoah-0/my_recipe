import React, { useState, useMemo } from 'react';
import {
  useGetSeafoodMealsQuery,
  useGetCategoriesQuery,
  useGetMealsByCategoryQuery,
  useSearchMealByNameQuery,
} from '../redux/mealApi';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: seafoodData, isLoading: isLoadingSeafood, error: seafoodError } = useGetSeafoodMealsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: categoryMealsData, isLoading: isLoadingCategoryMeals } = useGetMealsByCategoryQuery(selectedCategory, {
    skip: selectedCategory === 'All' || Boolean(searchQuery),
  });
  const { data: searchData, isLoading: isLoadingSearch } = useSearchMealByNameQuery(searchQuery, {
    skip: !searchQuery,
  });

  const isLoading = isLoadingSeafood || isLoadingSearch || isLoadingCategoryMeals;
  const error = seafoodError;

  const meals = useMemo(() => {
    if (searchQuery && searchData?.meals) {
      return searchData.meals;
    }

    if (selectedCategory !== 'All') {
      return categoryMealsData?.meals || [];
    }

    return seafoodData?.meals || [];
  }, [searchQuery, searchData, seafoodData, selectedCategory, categoryMealsData]);

  const getMealCategory = (meal: unknown) => {
    if (meal && typeof meal === 'object' && 'strCategory' in meal) {
      const category = (meal as { strCategory?: unknown }).strCategory;
      if (typeof category === 'string' && category.trim()) {
        return category;
      }
    }
    if (selectedCategory !== 'All') {
      return selectedCategory;
    }
    return 'Seafood';
  };

  const categoryOptions = useMemo(() => {
    const apiCategories = categoriesData?.meals?.map((item) => item.strCategory).filter(Boolean) || [];
    return ['All', ...apiCategories];
  }, [categoriesData]);

  const filteredMeals = useMemo(() => {
    if (searchQuery.trim() === '' || selectedCategory === 'All') {
      return meals;
    }
    return meals.filter((meal) => getMealCategory(meal) === selectedCategory);
  }, [meals, selectedCategory, searchQuery]);

  const totalItems = filteredMeals.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMeals = filteredMeals.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
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
    <div className="home-page">
      <div className="recipe-app-header">
        <div className="app-brand">
          <div className="app-logo" aria-hidden="true">
            R
          </div>
          <div className="app-brand-text">
            <span className="app-title">Recipe App</span>
            <span className="app-subtitle">Fresh meals every day</span>
          </div>
        </div>

        <label className="header-category">
          <span className="header-category-label">Category</span>
          <select
            className="header-category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            aria-label="Recipe category"
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <header className="page-header">
        <h1>Recipe Explorer</h1>
        <p>Discover delicious seafood recipes</p>
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

export default HomePage;
