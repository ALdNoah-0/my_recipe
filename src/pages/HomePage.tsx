import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMealsByCuisineQuery, useGetCategoriesQuery } from '../redux/mealApi';
import RecipeCard from '../components/RecipeCard';
import CategoryCard from '../components/CategoryCard';
import '../styles/MainPages.css';

const CUISINES = ['Japanese', 'Chinese', 'French', 'Italian', 'American', 'British'];

const FOOD_CATEGORIES = [
  { name: 'Beef', image: 'https://www.themealdb.com/images/category/beef.png' },
  { name: 'Chicken', image: 'https://www.themealdb.com/images/category/chicken.png' },
  { name: 'Pork', image: 'https://www.themealdb.com/images/category/pork.png' },
  { name: 'Lamb', image: 'https://www.themealdb.com/images/category/lamb.png' },
  { name: 'Seafood', image: 'https://www.themealdb.com/images/category/seafood.png' },
  { name: 'Pasta', image: 'https://www.themealdb.com/images/category/pasta.png' },
  { name: 'Dessert', image: 'https://www.themealdb.com/images/category/dessert.png' },
];

interface CuisineSectionProps {
  cuisine: string;
}

const CuisineSection: React.FC<CuisineSectionProps> = ({ cuisine }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMealsByCuisineQuery(cuisine);
  const meals = data?.meals?.slice(0, 6) || [];

  const handleViewAll = () => {
    navigate(`/recipe?cuisine=${encodeURIComponent(cuisine)}`);
  };

  return (
    <section className="cuisine-section">
      <div className="cuisine-section-header">
        <h2 className="cuisine-section-title">{cuisine} Cuisine</h2>
        <button className="view-all-button" onClick={handleViewAll}>
          View All <span className="view-all-arrow">▶</span>
        </button>
      </div>
      <div className="cuisine-recipes-scroll">
        {isLoading ? (
          <div className="cuisine-loading">Loading {cuisine} recipes...</div>
        ) : meals.length > 0 ? (
          meals.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              id={meal.idMeal}
              name={meal.strMeal}
              image={meal.strMealThumb}
              category={cuisine}
            />
          ))
        ) : (
          <div className="no-recipes">No recipes found</div>
        )}
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: categoriesData } = useGetCategoriesQuery();
  const marqueeCategories = [...FOOD_CATEGORIES, ...FOOD_CATEGORIES];

  const categoryOptions = ['All', ...(categoriesData?.meals?.map((item) => item.strCategory).filter(Boolean) || [])];

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    if (category !== 'All') {
      navigate(`/recipe?category=${encodeURIComponent(category)}`);
    } else {
      navigate('/recipe');
    }
  };

  return (
    <div className="main-page">
      <div className="recipe-app-header">
        <div className="app-brand">
          <div className="app-logo" aria-hidden="true">
            R
          </div>
          <div className="app-brand-text">
            <span className="app-title">Recipe App</span>
            <span className="app-subtitle">Learn to cook in our kitchen!</span>
          </div>
        </div>

        <label className="header-category">
          <span className="header-category-label">Category</span>
          <select
            className="header-category-select"
            defaultValue="All"
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
        <p>Discover delicious recipes from around the world</p>
      </header>

      {/* Cuisines Sections */}
      <h1 className="cuisines-title">Cuisines</h1>
      <div className="cuisines-container">
        {CUISINES.map((cuisine) => (
          <CuisineSection key={cuisine} cuisine={cuisine} />
        ))}
      </div>

      {/* Food Categories Section */}
      <section className="categories-section">
        <h2 className="categories-section-title">Food Categories</h2>
        <div className="categories-marquee" role="region" aria-label="Scrolling food categories">
          <div className="categories-track">
            {marqueeCategories.map((category, index) => (
              <div className="categories-track-item" key={`${category.name}-${index}`}>
                <CategoryCard
                  name={category.name}
                  image={category.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
