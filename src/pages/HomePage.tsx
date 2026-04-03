import React, { useState, useMemo } from 'react';
import { useGetSeafoodMealsQuery, useSearchMealByNameQuery } from '../redux/mealApi';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: seafoodData, isLoading: isLoadingSeafood, error: seafoodError } = useGetSeafoodMealsQuery();
  const { data: searchData, isLoading: isLoadingSearch } = useSearchMealByNameQuery(searchQuery, {
    skip: !searchQuery,
  });

  const isLoading = isLoadingSeafood || isLoadingSearch;
  const error = seafoodError;

  const meals = useMemo(() => {
    if (searchQuery && searchData?.meals) {
      return searchData.meals;
    }
    return seafoodData?.meals || [];
  }, [searchQuery, searchData, seafoodData]);

  const totalItems = meals.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMeals = meals.slice(startIndex, endIndex);

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
    <div className="home-page">
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
            category="Seafood"
          />
        ))}
      </div>

      {!isLoading && meals.length > 0 && (
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
