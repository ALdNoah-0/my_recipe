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

  return (
    <div className="category-card" onClick={handleClick}>
      <div className="category-card-image-container">
        <img src={image} alt={name} className="category-card-image" />
      </div>
      <h2 className="category-card-name">{name}</h2>
    </div>
  );
};

export default CategoryCard;
