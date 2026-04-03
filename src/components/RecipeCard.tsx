import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecipeCard.css';

interface RecipeCardProps {
  id: string;
  name: string;
  image: string;
  category?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, name, image, category = 'Seafood' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${id}`);
  };

  // Determine card personality based on category
  const getCardClass = () => {
    if (category.toLowerCase().includes('vegetable') || category.toLowerCase().includes('vegan')) {
      return 'quick';
    }
    if (category.toLowerCase().includes('meat') || category.toLowerCase().includes('beef')) {
      return 'high-protein';
    }
    if (category.toLowerCase().includes('seafood') || category.toLowerCase().includes('pasta')) {
      return 'high-prep';
    }
    return 'quick';
  };

  return (
    <div className={`recipe-card ${getCardClass()}`} onClick={handleClick}>
      <img src={image} alt={name} className="recipe-card-image" />
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{name}</h3>
        <div className="recipe-card-meta">
          <div className="recipe-card-meta-item">
            <span className="recipe-card-meta-label">Category</span>
            <span className="recipe-card-meta-value">{category}</span>
          </div>
        </div>
        <button className="recipe-card-button">View Recipe</button>
      </div>
    </div>
  );
};

export default RecipeCard;
