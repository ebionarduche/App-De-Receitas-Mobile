import React, { useContext } from 'react';
import Header from '../components/Header';
import ProgressContext from '../context/ProgressContext';
import RecipeCard from '../components/RecipeCard';

function DoneRecipes() {
  const {
    doneRecipes,
  } = useContext(ProgressContext);

  const recipeCards = doneRecipes.map((recipe, index) => (
    <RecipeCard
      key={ recipe.name + index }
      index={ index }
      recipe={ recipe }
    />
  ));

  return (
    <div>
      <Header title="Done Recipes" btnProfile />
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      { recipeCards }
    </div>
  );
}

export default DoneRecipes;
