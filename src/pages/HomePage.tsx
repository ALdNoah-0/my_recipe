import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import { useGetMealsByCuisineQuery, useGetRandomMealQuery } from '../redux/mealApi';
import RecipeCard from '../components/RecipeCard';
import CategoryCard from '../components/CategoryCard';
import FeaturedRecipeCard from '../components/FeaturedRecipeCard';
import '../styles/MainPages.css';

const CUISINES = ['Japanese', 'Filipino', 'Chinese', 'French', 'Italian', 'American', 'British'];

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
  const meals = useMemo(() => data?.meals?.slice(0, 6) || [], [data]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      container?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [meals]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleViewAll = () => {
    navigate(`/recipe?cuisine=${encodeURIComponent(cuisine)}`);
  };

  return (
    <section className="cuisine-section">
      <div className="cuisine-section-header">
        <h2 className="cuisine-section-title">{cuisine} Cuisine</h2>
        <button className="view-all-button" onClick={handleViewAll}>
          View All <ArrowRight size={18} weight="bold" className="button-icon" />
        </button>
      </div>
      <div className="cuisine-scroll-wrapper">
        {showLeftArrow && (
          <button
            className="cuisine-scroll-arrow cuisine-scroll-arrow-left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ArrowLeft size={20} weight="bold" />
          </button>
        )}
        <div className="cuisine-recipes-scroll" ref={scrollContainerRef}>
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
        {showRightArrow && (
          <button
            className="cuisine-scroll-arrow cuisine-scroll-arrow-right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ArrowRight size={20} weight="bold" />
          </button>
        )}
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  const marqueeCategories = [...FOOD_CATEGORIES, ...FOOD_CATEGORIES];
  const recipeOfDayRef = useRef<HTMLElement | null>(null);

  const scrollToRecipeOfDay = () => {
    if (!recipeOfDayRef.current) {
      return;
    }

    const headerOffset = 96;
    const targetTop = recipeOfDayRef.current.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    });
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
    <div className="main-page--home">
      <header className="home-hero" id="home-hero">
        <div className="home-hero__overlay" aria-hidden="true" />
        <div className="home-hero__content">
          <h1>Recipe Explorer</h1>
          <h2>Discover delicious recipes from around the world</h2>
          <button className="home-hero__button" onClick={scrollToRecipeOfDay}>
            Explore Recipes
            <ArrowRight size={18} weight="bold" className="button-icon home-hero__button-icon" />
          </button>
        </div>
      </header>

      <div className="home-content">
        <section className="recipe-of-day" ref={recipeOfDayRef}>
          <h2 className="recipe-of-day-title">
            <Heart size={28} weight="bold" className="section-heading-icon" />
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

        <h1 className="cuisines-title">Cuisines</h1>
        <div className="cuisines-container">
          {CUISINES.map((cuisine) => (
            <CuisineSection key={cuisine} cuisine={cuisine} />
          ))}
        </div>

        <section className="categories-section">
          <h2 className="categories-section-title">Food Categories</h2>
          <div className="categories-marquee" role="region" aria-label="Scrolling food categories">
            <div className="categories-track">
              {marqueeCategories.map((category, index) => (
                <div className="categories-track-item" key={`${category.name}-${index}`}>
                  <CategoryCard name={category.name} image={category.image} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
