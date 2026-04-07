import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { useGetMealsByCuisineQuery, useGetCategoriesQuery, useGetRandomMealQuery } from '../redux/mealApi';
import RecipeCard from '../components/RecipeCard';
import CategoryCard from '../components/CategoryCard';
import FeaturedRecipeCard from '../components/FeaturedRecipeCard';
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
          View All <ArrowRightIcon size={18} weight="bold" style={{ display: 'inline', marginLeft: '6px', verticalAlign: 'text-bottom' }} />
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

  /* Recipe of the day random recipe fetching */
  const { data: randomData } = useGetRandomMealQuery();
  const randomMeal = randomData?.meals?.[0];

  // Get today's date key
  const todayKey = new Date().toISOString().split('T')[0]; // e.g. "2026-04-07"
  const storedMeal = localStorage.getItem(`recipeOfTheDay-${todayKey}`);

  let recipeOfTheDay = storedMeal ? JSON.parse(storedMeal) : null;

  // Only save a random meal if we don’t already have one for today
  if (!recipeOfTheDay && randomData?.meals?.length) {
    recipeOfTheDay = randomData.meals[0]; // pick the first random meal
    localStorage.setItem(`recipeOfTheDay-${todayKey}`, JSON.stringify(recipeOfTheDay));
  }

  // Extract number of ingredients
  const ingredients: { strIngredient: string; strMeasure: string }[] =
    recipeOfTheDay
      ? Array.from({ length: 20 }, (_, i) => ({
          strIngredient: recipeOfTheDay[`strIngredient${i + 1}` as keyof typeof recipeOfTheDay] || '',
          strMeasure: recipeOfTheDay[`strMeasure${i + 1}` as keyof typeof recipeOfTheDay] || '',
        })).filter(item => item.strIngredient.trim() !== '')
      : [];

  const numIngredients = ingredients.length;

  // Extract tags
  const tags = recipeOfTheDay?.strTags ? recipeOfTheDay.strTags.split(',') : [];

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
      
      {/* Recipe of the Day */}
      <section className="recipe-of-day">
        <h2 className="recipe-of-day-title">
          <HeartIcon size={28} weight="bold" style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          Recipe of the Day
        </h2>
        <div className="recipe-of-day-container">
          {!randomMeal ? (
            <div>Loading recipe of the day...</div>
          ) : (
            <FeaturedRecipeCard
              id={recipeOfTheDay?.idMeal || ''}
              name={recipeOfTheDay?.strMeal || ''}
              image={recipeOfTheDay?.strMealThumb || ''}
              category={recipeOfTheDay?.strCategory}
              cuisine={recipeOfTheDay?.strArea}
              ingredients={numIngredients}
              tags={tags}
            />
          )}
        </div>
      </section>

      {/* Cuisines Sections */}
      <h1 className="cuisines-title">
        Cuisines
      </h1>
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
