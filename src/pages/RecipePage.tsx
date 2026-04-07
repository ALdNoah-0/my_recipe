import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  useGetSeafoodMealsQuery,
  useGetCategoriesQuery,
  useGetCuisinesQuery,
  useGetMealsByCategoryQuery,
  useGetMealsByCuisineQuery,
  useSearchMealByNameQuery,
} from '../redux/mealApi';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import '../styles/MainPages.css';

const RecipePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Read query params on mount and when they change
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const cuisineParam = searchParams.get('cuisine');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setSelectedCuisine('All');
    } else if (cuisineParam) {
      setSelectedCuisine(cuisineParam);
      setSelectedCategory('All');
    }
  }, [searchParams]);

  const { data: seafoodData, isLoading: isLoadingSeafood, error: seafoodError } = useGetSeafoodMealsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: cuisinesData } = useGetCuisinesQuery();
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
      return searchData.meals;
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
    if (selectedCuisine !== 'All') {
      return selectedCuisine;
    }
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

  const cuisineOptions = useMemo(() => {
    const apiCuisines = cuisinesData?.meals?.map((item) => item.strArea).filter(Boolean) || [];
    return ['All', ...apiCuisines];
  }, [cuisinesData]);

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

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCategory(value);
    setSelectedCuisine('All');
    setCurrentPage(1);
    if (value !== 'All') {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  };

  const handleCuisineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCuisine(value);
    setSelectedCategory('All');
    setCurrentPage(1);
    if (value !== 'All') {
      setSearchParams({ cuisine: value });
    } else {
      setSearchParams({});
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleReturnToHome = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/');
  };

  if (error) {
    return <div className="error-message">Error loading recipes. Please try again later.</div>;
  }

  return (
    <div className="main-page">
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

        <div className="header-filters">
          <label className="header-category">
            <button className="header-category-select planner-nav-button" aria-label="Back" onClick={handleReturnToHome}>
              Back
            </button>
          </label>

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

          <label className="header-category">
            <span className="header-category-label">Cuisine</span>
            <select
              className="header-category-select"
              value={selectedCuisine}
              onChange={handleCuisineChange}
              aria-label="Recipe cuisine"
            >
              {cuisineOptions.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <header className="page-header">
        <h1>Recipe Explorer</h1>
        <p>Discover delicious recipes</p>
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
