import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { useGetMealDetailsQuery } from '../redux/mealApi';
import '../styles/RecipeDetailPage.css';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetMealDetailsQuery(id || '');

  const meal = data?.meals?.[0];

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
            <ArrowLeftIcon size={18} weight="bold" style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
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
      <button onClick={() => navigate('/')} className="back-button">
        <ArrowLeftIcon size={18} weight="bold" style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
        Back to Recipes
      </button>

      <div className="recipe-detail-container">
        <div className="recipe-detail-image">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>

        <div className="recipe-detail-info">
          <h1>{meal.strMeal}</h1>
          <p className="recipe-subtitle">{ingredients.length} ingredients</p>

          <div className="recipe-meta">
            {meal.strCategory && (
              <div className="meta-item">
                <strong>Category</strong>
                <span className="meta-value">{meal.strCategory}</span>
              </div>
            )}
            {meal.strArea && (
              <div className="meta-item">
                <strong>Cuisine</strong>
                <span className="meta-value">{meal.strArea}</span>
              </div>
            )}
            {tags.length > 0 && (
              <div className="meta-item">
                <strong>Tags</strong>
                <span className="meta-value">{tags.join(', ')}</span>
              </div>
            )}
          </div>

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

          <div className="recipe-section">
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

          {meal.strYoutube && (
            <div className="recipe-section">
              <h2>Video Tutorial</h2>
              <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="video-link">
                Watch on YouTube
                <ArrowRightIcon size={18} weight="bold" style={{ marginLeft: '6px', verticalAlign: 'text-bottom' }} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
