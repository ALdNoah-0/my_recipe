import React, { useMemo, useState, useEffect } from 'react';
import {
  useGetIngredientsQuery,
  useLazyGetMealsByIngredientQuery,
  useGetMealDetailsQuery,
} from '../redux/mealApi';
import RecipeCard from '../components/RecipeCard';
import '../styles/IngredientPlannerPage.css';
import type { SeafoodMeal } from '../types/recipe';

type RankedMeal = SeafoodMeal & {
  matchedCount: number;
  matchedIngredients: string[];
};

interface MatchedRecipeCardProps {
  meal: RankedMeal;
  totalSelectedIngredients: number;
}

const MatchedRecipeCard: React.FC<MatchedRecipeCardProps> = ({ meal, totalSelectedIngredients }) => {
  const { data: mealDetailsData } = useGetMealDetailsQuery(meal.idMeal);
  const mealCategory = mealDetailsData?.meals?.[0]?.strCategory?.trim() || 'Recipe';

  return (
    <div className="planner-recipe-card-wrap">
      <div className="match-badge">
        {meal.matchedCount}/{totalSelectedIngredients} ingredients
      </div>
      <RecipeCard
        id={meal.idMeal}
        name={meal.strMeal}
        image={meal.strMealThumb}
        category={mealCategory}
      />
    </div>
  );
};

const DEFAULT_SUGGESTED_INGREDIENTS = [
  'Chicken',
  'Egg',
  'Garlic',
  'Onion',
  'Tomato',
  'Rice',
  'Potato',
  'Lemon',
  'Cheese',
  'Carrot',
  'Milk',
  'Butter',
];

const IngredientPlannerPage: React.FC = () => {
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [rankedMeals, setRankedMeals] = useState<RankedMeal[]>([]);
  const [isMatchingRecipes, setIsMatchingRecipes] = useState(false);
  const [matchingError, setMatchingError] = useState<string | null>(null);

  const { data: ingredientsData, isLoading: isLoadingIngredients } = useGetIngredientsQuery();
  const [fetchMealsByIngredient] = useLazyGetMealsByIngredientQuery();

  const allIngredients = useMemo(() => {
    if (!ingredientsData?.meals) {
      return [];
    }

    return ingredientsData.meals
      .map((item) => item.strIngredient)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [ingredientsData]);

  const ingredientOptions = useMemo(() => {
    if (allIngredients.length === 0) {
      return DEFAULT_SUGGESTED_INGREDIENTS;
    }

    const uniqueOptions = new Set<string>([
      ...DEFAULT_SUGGESTED_INGREDIENTS,
      ...allIngredients,
    ]);

    return Array.from(uniqueOptions);
  }, [allIngredients]);

  const visibleIngredients = useMemo(() => {
    if (!ingredientSearch.trim()) {
      return ingredientOptions.slice(0, 80);
    }

    const normalizedSearch = ingredientSearch.trim().toLowerCase();
    return ingredientOptions
      .filter((ingredient) => ingredient.toLowerCase().includes(normalizedSearch))
      .slice(0, 80);
  }, [ingredientOptions, ingredientSearch]);

  useEffect(() => {
    let active = true;

    const getMatchingMeals = async () => {
      if (selectedIngredients.length === 0) {
        setRankedMeals([]);
        setMatchingError(null);
        return;
      }

      setIsMatchingRecipes(true);
      setMatchingError(null);

      try {
        const results = await Promise.all(
          selectedIngredients.map(async (ingredient) => {
            const response = await fetchMealsByIngredient(ingredient, true).unwrap();
            return {
              ingredient,
              meals: response.meals ?? [],
            };
          }),
        );

        if (!active) {
          return;
        }

        const mealMap = new Map<string, RankedMeal>();

        results.forEach(({ ingredient, meals }) => {
          meals.forEach((meal) => {
            const existingMeal = mealMap.get(meal.idMeal);

            if (!existingMeal) {
              mealMap.set(meal.idMeal, {
                ...meal,
                matchedCount: 1,
                matchedIngredients: [ingredient],
              });
              return;
            }

            mealMap.set(meal.idMeal, {
              ...existingMeal,
              matchedCount: existingMeal.matchedCount + 1,
              matchedIngredients: [...existingMeal.matchedIngredients, ingredient],
            });
          });
        });

        const sortedMeals = Array.from(mealMap.values()).sort((a, b) => {
          if (b.matchedCount !== a.matchedCount) {
            return b.matchedCount - a.matchedCount;
          }
          return a.strMeal.localeCompare(b.strMeal);
        });

        setRankedMeals(sortedMeals);
      } catch {
        if (!active) {
          return;
        }
        setMatchingError('Unable to fetch matching recipes right now. Please try again.');
        setRankedMeals([]);
      } finally {
        if (active) {
          setIsMatchingRecipes(false);
        }
      }
    };

    getMatchingMeals();

    return () => {
      active = false;
    };
  }, [fetchMealsByIngredient, selectedIngredients]);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((current) => {
      if (current.includes(ingredient)) {
        return current.filter((item) => item !== ingredient);
      }
      return [...current, ingredient];
    });
  };

  const clearSelection = () => {
    setSelectedIngredients([]);
  };

  const topMeals = rankedMeals.slice(0, 18);

  return (
    <div className="ingredient-planner-page">
      <header className="page-header page-header-gif">
        <h1>Ingredient Planner</h1>
        <h2>Check what is in your kitchen and get recipe matches based on your selected ingredients.</h2>
      </header>

      <section className="planner-layout">
        <aside className="ingredient-panel">
          <div className="ingredient-panel-header">
            <h2>Your Ingredients</h2>
            {selectedIngredients.length > 0 && (
              <button className="clear-selection-button" onClick={clearSelection}>
                Clear all
              </button>
            )}
          </div>

          <label className="ingredient-search-label" htmlFor="ingredient-search">
            Search ingredient
          </label>
          <input
            id="ingredient-search"
            className="ingredient-search-input"
            type="text"
            placeholder="Type ingredients like chicken, rice, onion..."
            value={ingredientSearch}
            onChange={(event) => setIngredientSearch(event.target.value)}
          />

          {isLoadingIngredients ? (
            <div className="planner-loading">Loading ingredient checklist...</div>
          ) : (
            <div className="ingredient-checklist" role="group" aria-label="Available ingredients">
              {visibleIngredients.map((ingredient) => {
                const isChecked = selectedIngredients.includes(ingredient);
                return (
                  <label key={ingredient} className={`ingredient-option ${isChecked ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleIngredient(ingredient)}
                    />
                    <span>{ingredient}</span>
                  </label>
                );
              })}
            </div>
          )}
        </aside>

        <section className="results-panel">
          <div className="results-summary">
            <h2>Suggested Recipes</h2>
            <p>
              {selectedIngredients.length === 0
                ? 'Pick ingredients to discover meals you can cook now.'
                : `Using ${selectedIngredients.length} ingredient${selectedIngredients.length > 1 ? 's' : ''}`}
            </p>
          </div>

          {selectedIngredients.length > 0 && (
            <div className="selected-chips">
              {selectedIngredients.map((ingredient) => (
                <button
                  key={ingredient}
                  className="ingredient-chip"
                  onClick={() => toggleIngredient(ingredient)}
                >
                  {ingredient} x
                </button>
              ))}
            </div>
          )}

          {isMatchingRecipes && <div className="planner-loading">Finding recipe matches...</div>}

          {matchingError && <div className="planner-error">{matchingError}</div>}

          {!isMatchingRecipes && !matchingError && selectedIngredients.length > 0 && topMeals.length === 0 && (
            <div className="planner-empty">No recipe matches found yet. Try adding broader ingredients.</div>
          )}

          <div className="planner-recipe-grid">
            {topMeals.map((meal) => (
              <MatchedRecipeCard
                key={meal.idMeal}
                meal={meal}
                totalSelectedIngredients={selectedIngredients.length}
              />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default IngredientPlannerPage;
