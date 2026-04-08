import React from 'react';

interface HeaderProps {
  categoryOptions: string[];
  onPrimaryAction: () => void;
  primaryActionLabel: string;
  onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categoryValue?: string;
  cuisineOptions?: string[];
  onCuisineChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  cuisineValue?: string;
  appSubtitle?: string;
  showHero?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
}

const Header: React.FC<HeaderProps> = ({
  categoryOptions,
  onPrimaryAction,
  primaryActionLabel,
  onCategoryChange,
  categoryValue,
  cuisineOptions,
  onCuisineChange,
  cuisineValue,
  appSubtitle = 'Learn to cook in our kitchen!',
  showHero = true,
  heroTitle = 'Recipe Explorer',
  heroSubtitle = 'Discover delicious recipes from around the world',
}) => {
  const categorySelectProps =
    categoryValue !== undefined ? { value: categoryValue } : { defaultValue: 'All' };

  const cuisineSelectProps =
    cuisineValue !== undefined ? { value: cuisineValue } : { defaultValue: 'All' };
  
  return (
    <>
      <div className="recipe-app-header">
        <div className="app-brand">
          <div className="app-logo" aria-hidden="true">
            R
          </div>
          <div className="app-brand-text">
            <span className="app-title">Recipe App</span>
            <span className="app-subtitle">{appSubtitle}</span>
          </div>
        </div>

        <div className="header-filters">
          <button className="header-nav-button" onClick={onPrimaryAction}>
            {primaryActionLabel}
          </button>

          <label className="header-category">
            <span className="header-category-label">Category</span>
            <select
              className="header-category-select"
              {...categorySelectProps}
              onChange={onCategoryChange}
              aria-label="Recipe category"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          {cuisineOptions && onCuisineChange && (
            <label className="header-category">
              <span className="header-category-label">Cuisine</span>
              <select
                className="header-category-select"
                {...cuisineSelectProps}
                onChange={onCuisineChange}
                aria-label="Recipe cuisine"
              >
                {cuisineOptions.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>

      {showHero && (
        <header className="page-header page-header-gif">
          <h1>{heroTitle}</h1>
          <p>{heroSubtitle}</p>
        </header>
      )}
    </>
  );
};

export default Header;