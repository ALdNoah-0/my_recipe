import React, { useState, useEffect, useMemo } from 'react';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { useGetMealDetailsQuery } from '../redux/mealApi';
import '../styles/MainPages.css';

const LikedRecipesPage: React.FC = () => {
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('likedRecipes') || '[]');
    setLikedIds(saved);
  }, []);

  const filteredIds = useMemo(() => {
    return likedIds.filter((id) => id.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [likedIds, searchQuery]);

  const totalItems = filteredIds.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIds = filteredIds.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="main-page">
      {/* Header */}
      <header className="page-header page-header-gif">
        <h1>My Favorites</h1>
        <h2>Your saved and liked recipes in one place.</h2>
      </header>

      <SearchBar onSearch={handleSearch} placeholder="Search your liked recipes..." />

      {totalItems === 0 && (
        <div className="no-results">
          You haven’t liked any recipes yet.
        </div>
      )}

      <div className="recipe-grid">
        {currentIds.map((id) => (
          <LikedRecipeCard key={id} id={id} />
        ))}
      </div>

      {totalItems > itemsPerPage && (
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

interface LikedRecipeCardProps {
  id: string;
}

const LikedRecipeCard: React.FC<LikedRecipeCardProps> = ({ id }) => {
  const { data, isLoading, error } = useGetMealDetailsQuery(id);

  if (isLoading || error || !data?.meals?.[0]) return null;

  const meal = data.meals[0];

  return (
    <RecipeCard
      id={meal.idMeal}
      name={meal.strMeal}
      image={meal.strMealThumb}
      category={meal.strCategory ?? meal.strArea ?? 'Unknown'}
    />
  );
};

export default LikedRecipesPage;