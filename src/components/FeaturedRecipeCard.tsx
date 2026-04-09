import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FeaturedRecipeCard.css';

interface FeaturedRecipeCardProps {
  id: string;
  name: string;
  image: string;
  category?: string;
  cuisine?: string;
  ingredients?: number;
  tags?: string[];
}

const FeaturedRecipeCard: React.FC<FeaturedRecipeCardProps> = ({
  id,
  name,
  image,
  category,
  cuisine,
  ingredients = 0,
  tags = [],  
}) => {
  const navigate = useNavigate();

    const getDishDescription = () => {
    const dishName = name || 'This dish';
    const topTags = tags.slice(0, 2).map((tag) => tag.toLowerCase());

    if (ingredients >= 10) {
      return `${dishName} is a rich, satisfying dish made with ${ingredients} ingredients for deep flavor in every bite.`;
    }

    if (ingredients >= 5) {
      return `${dishName} is a balanced and flavorful recipe with ${ingredients} fresh ingredients that come together beautifully.`;
    }

    if (topTags.length === 2) {
      return `${dishName} delivers ${topTags[0]} and ${topTags[1]} character in every forkful, with a finish that keeps you coming back.`;
    }

    if (topTags.length === 1) {
      return `${dishName} brings a ${topTags[0]} touch with warm, balanced flavors that are easy to love.`;
    }

    return `${dishName} is a crave-worthy plate with layered flavor and a cozy, restaurant-style finish.`;
  };
  const teaserText = getDishDescription();

  return (
    <div className="featured-recipe-card" onClick={() => navigate(`/recipe/${id}`)}>
      <img src={image} alt={name} className="featured-recipe-image" />

      <div className="featured-recipe-content">
        <h3>{name}</h3>

        <div className="recipe-meta">
          {category && (
            <div className="meta-item">
              <span className="featured-recipe-card-meta-label">Category:</span>{' '}
              <span className="meta-value">{category}</span>
            </div>
          )}
          {cuisine && (
            <div className="meta-item">
              <span className="featured-recipe-card-meta-label">Cuisine:</span>{' '}
              <span className="meta-value">{cuisine}</span>
            </div>
          )}
          {tags.length > 0 && (
            <div className="meta-item">
              <strong>Tags</strong>
              <span className="meta-value">{tags.join(', ')}</span>
            </div>
          )}
        </div>
        <p className="featured-recipe-description">{teaserText}</p>
        <div className="ingredients-count">{ingredients} ingredients</div>
        <button className="featured-recipe-card-button">View Recipe</button>
      </div>
    </div>
  );
};

export default FeaturedRecipeCard;