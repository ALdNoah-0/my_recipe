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

  return (
    <div className="featured-recipe-card" onClick={() => navigate(`/recipe/${id}`)}>
      <img src={image} alt={name} className="featured-recipe-image" />

      <div className="featured-recipe-content">
        <h3>{name}</h3>

        <div className="recipe-meta">
          {category && (
            <div className="meta-item">
              <strong>Category</strong>
              <span className="meta-value">{category}</span>
            </div>
          )}
          {cuisine && (
            <div className="meta-item">
              <strong>Cuisine</strong>
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
        <div className="ingredients-count">{ingredients} ingredients</div>
        <button className="featured-recipe-card-button">View Recipe</button>
      </div>
    </div>
  );
};

export default FeaturedRecipeCard;