import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoryCard.css';
import '../styles/global.css';

interface CategoryCardProps {
  name: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe?category=${encodeURIComponent(name)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="category-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open ${name} recipes`}
    >
      <div className="category-card-image-container">
        <img src={image} alt={name} className="category-card-image" />
      </div>
      <h3 className="category-card-name">{name}</h3>
    </div>
  );
};

export default CategoryCard;
