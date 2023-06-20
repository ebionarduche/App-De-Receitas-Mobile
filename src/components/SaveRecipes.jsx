import { useState } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import RecipeCard from './RecipeCard';
import './SaveRecipes.css';

function SaveRecipes({ title, localKey }) {
  const getLocal = JSON.parse(localStorage.getItem(localKey));
  const [savedRecipes, setSavedRecipes] = useState(getLocal);

  const [filter, setFilter] = useState('all');

  const loadLocal = () => {
    const local = JSON.parse(localStorage.getItem(localKey));
    setSavedRecipes(local);
  };

  // Não há receitas salvas no localStorage?
  if (!savedRecipes) {
    return (
      <div>
        <Header title={ title } btnProfile />
      </div>
    );
  }

  const magicNumber = -1;
  let trybeIndex = magicNumber;
  const recipeCards = savedRecipes.map((recipe, index) => {
    if (filter === 'all' || recipe.type === filter) {
      trybeIndex += 1;
      return (
        <RecipeCard
          key={ recipe.name + index }
          index={ trybeIndex }
          recipe={ recipe }
          reload={ loadLocal }
        />
      );
    }
    return ('');
  });

  const buttonSetFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div>
      <div className="save-recipes-container">
        <Header title={ title } btnProfile />
        <button
          onClick={ () => (buttonSetFilter('all')) }
          data-testid="filter-by-all-btn"
        >
          <div>
            All
          </div>
        </button>
        <button
          onClick={ () => (buttonSetFilter('meal')) }
          data-testid="filter-by-meal-btn"
        >
          <div>
            Meals
          </div>
        </button>
        <button
          onClick={ () => (buttonSetFilter('drink')) }
          data-testid="filter-by-drink-btn"
        >
          <div>
            Drinks
          </div>
        </button>
      </div>
      { recipeCards }
    </div>
  );
}

SaveRecipes.propTypes = {
  title: PropTypes.string.isRequired,
  localKey: PropTypes.string.isRequired,
};

export default SaveRecipes;
