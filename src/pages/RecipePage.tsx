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
import Header from '../components/Header';
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
      return searchData.meals.filter((meal) => {
        if (selectedCuisine !== 'All') {
          return 'strArea' in meal && meal.strArea === selectedCuisine;
        }

        if (selectedCategory !== 'All') {
          return 'strCategory' in meal && meal.strCategory === selectedCategory;
        }

        return true;
      });
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
      <Header
        categoryOptions={categoryOptions}
        onPrimaryAction={handleReturnToHome}
        primaryActionLabel="Back"
        onCategoryChange={handleCategoryChange}
        categoryValue={selectedCategory}
        cuisineOptions={cuisineOptions}
        onCuisineChange={handleCuisineChange}
        cuisineValue={selectedCuisine}
        appSubtitle="Fresh meals every day"
        showHero={false}
      />

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
