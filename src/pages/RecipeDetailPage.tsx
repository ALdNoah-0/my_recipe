import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { useGetMealDetailsQuery } from '../redux/mealApi';
import PlayableVideo from '../components/PlayableVideo';
import '../styles/RecipeDetailPage.css';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetMealDetailsQuery(id || '');
  const videoRef = useRef<HTMLDivElement>(null);

  const [liked, setLiked] = useState(false);
  
  const meal = data?.meals?.[0];

  // Load liked state from localStorage
  useEffect(() => {
    if (meal) {
      const likedRecipes = JSON.parse(localStorage.getItem('likedRecipes') || '[]');
      setLiked(likedRecipes.includes(meal.idMeal));
    }
  }, [meal]);

  // Toggle like
  const toggleLike = () => {
    if (!meal) return;
    const likedRecipes: string[] = JSON.parse(localStorage.getItem('likedRecipes') || '[]');
    if (liked) {
      const updated = likedRecipes.filter((recipeId) => recipeId !== meal.idMeal);
      localStorage.setItem('likedRecipes', JSON.stringify(updated));
      setLiked(false);
    } else {
      likedRecipes.push(meal.idMeal);
      localStorage.setItem('likedRecipes', JSON.stringify(likedRecipes));
      setLiked(true);
    }
  };

  
  const handleWatchVideo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const iframe = videoRef.current?.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*'
          );
        }
      }, 800);
    }
  };

  const getIngredients = () => {
    if (!meal) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({
          ingredient: ingredient as string,
          measure: (measure as string) || '',
        });
      }
    }
    return ingredients;
  };

  if (isLoading) {
    return <div className="loading">Loading recipe details...</div>;
  }

  if (error || !meal) {
    return (
      <div className="recipe-detail-page">
        <div className="error-message">
          <p>Recipe not found. Please go back and try again.</p>
          <button onClick={() => navigate('/')} className="back-button">
            <ArrowLeft size={18} weight="bold" style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients();
  const tags = (meal.strTags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  const getDishDescription = () => {
    const name = meal.strMeal || 'This dish';
    const topTags = tags.slice(0, 2).map((tag) => tag.toLowerCase());
    const highlightedIngredients = ingredients
      .map((item) => item.ingredient.trim())
      .filter(Boolean)
      .slice(0, 3);

    if (highlightedIngredients.length === 3) {
      return `${name} layers ${highlightedIngredients[0]}, ${highlightedIngredients[1]}, and ${highlightedIngredients[2]} into a rich, comforting dish with a homemade feel.`;
    }

    if (highlightedIngredients.length === 2) {
      return `${name} pairs ${highlightedIngredients[0]} with ${highlightedIngredients[1]} for a bold, satisfying bite that feels special any night of the week.`;
    }

    if (topTags.length === 2) {
      return `${name} delivers ${topTags[0]} and ${topTags[1]} character in every forkful, with a finish that keeps you coming back.`;
    }

    if (topTags.length === 1) {
      return `${name} brings a ${topTags[0]} touch with warm, balanced flavors that are easy to love.`;
    }

    return `${name} is a crave-worthy plate with layered flavor and a cozy, restaurant-style finish.`;
  };

  const teaserText = getDishDescription();

  // Clean and parse instructions into steps
  const parseInstructions = (text: string) => {
    // First, clean HTML tags and entities
    let cleaned = text
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .trim();

    // Split by "step" pattern (case insensitive, with number)
    const stepPattern = /step\s+(\d+)/gi;
    const steps = [];
    let lastIndex = 0;
    let match;

    while ((match = stepPattern.exec(cleaned)) !== null) {
      if (lastIndex > 0) {
        // Get the previous step's content
        const stepContent = cleaned.substring(lastIndex, match.index).trim();
        steps.push(stepContent);
      }
      lastIndex = match.index + match[0].length;
    }

    // Add the last step
    if (lastIndex > 0) {
      steps.push(cleaned.substring(lastIndex).trim());
    }

    // If no steps found, return text as single step
    if (steps.length === 0) {
      steps.push(cleaned);
    }

    return steps;
  };

  return (
    <div className="recipe-detail-page">
      <header className="page-header page-header-gif">
        <h1>Recipe Detail</h1>
        <h2>View ingredients, follow step-by-step instructions, and cook this recipe with confidence.</h2>
      </header>

      <button onClick={() => navigate('/')} className="back-button">
        <ArrowLeft size={18} weight="bold" style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
        Back to Recipes
      </button>

      <div className="recipe-showcase">
        <div className="recipe-showcase-copy">
          <span className="recipe-showcase-badge">Featured Dish</span>
          <h1>{meal.strMeal}</h1>
          <p className="recipe-showcase-teaser">
            {teaserText || 'A crave-worthy recipe ready for your next kitchen win.'}
          </p>

          <div className="recipe-showcase-stats">
            <div className="showcase-stat-card">
              <span className="showcase-stat-label">Ingredients</span>
              <strong>{ingredients.length}</strong>
            </div>
            {meal.strArea && (
              <div className="showcase-stat-card">
                <span className="showcase-stat-label">Cuisine</span>
                <strong>{meal.strArea}</strong>
              </div>
            )}
            {meal.strCategory && (
              <div className="showcase-stat-card">
                <span className="showcase-stat-label">Category</span>
                <strong>{meal.strCategory}</strong>
              </div>
            )}
          </div>

          {tags.length > 0 && (
            <div className="recipe-showcase-tags" aria-label="Recipe tags">
              {tags.slice(0, 4).map((tag) => (
                <span key={tag} className="recipe-showcase-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="recipe-showcase-actions">
            <a href="#recipe-instructions" className="primary-cta">
              Start Cooking
            </a>
            {meal.strYoutube && (
              <a href="#video" onClick={handleWatchVideo} className="video-link">
                Watch Video
                <ArrowRight size={18} weight="bold" style={{ marginLeft: '6px', verticalAlign: 'text-bottom' }} />
              </a>
            )}
          </div>
          
          <button onClick={toggleLike} className={`like-button ${liked ? 'liked' : ''}`}>
              {liked ? '❤️ Liked' : '🤍 Like'}
          </button>
        </div>

        <div className="recipe-showcase-visual" aria-hidden="true">
          <div className="recipe-image-stage">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div className="recipe-image-shadow" />
          </div>
        </div>
      </div>

      {meal.strYoutube && (
        <PlayableVideo ref={videoRef} youtubeUrl={meal.strYoutube} title={`${meal.strMeal} Recipe Video`} />
      )}

      <div className="recipe-detail-content-grid">
        <div className="recipe-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((item, index) => (
              <li key={index}>
                <span className="ingredient-name">{item.ingredient}</span>
                <span className="ingredient-measure">{item.measure}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="recipe-section" id="recipe-instructions">
          <h2>Instructions</h2>
          <ol className="instructions-list">
            {parseInstructions(meal.strInstructions).map((step, index) => (
              <li key={index} className="instruction-step">
                <span className="step-number">Step {index + 1}</span>
                <span className="step-content">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
