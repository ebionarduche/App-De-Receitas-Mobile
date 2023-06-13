import { useState } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const [filter, setFilter] = useState('all');

  // Não há receitas salvas no localStorage?
  if (!doneRecipes) {
    // Descomente se quiser salvar informação no localStorage para teste
    // const newDoneRecipes = [
    //   {
    //     id: '52771',
    //     type: 'meal',
    //     nationality: 'Italian',
    //     category: 'Vegetarian',
    //     alcoholicOrNot: '',
    //     name: 'Spicy Arrabiata Penne',
    //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    //     doneDate: '23/06/2020',
    //     tags: ['Pasta', 'Curry'],
    //   },
    //   {
    //     id: '178319',
    //     type: 'drink',
    //     nationality: '',
    //     category: 'Cocktail',
    //     alcoholicOrNot: 'Alcoholic',
    //     name: 'Aquamarine',
    //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    //     doneDate: '23/06/2020',
    //     tags: [],
    //   },
    // ];
    // localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));

    return (
      <div>
        <Header title="Done Recipes" btnProfile />
      </div>
    );
  }

  const magicNumber = -1;
  let trybeIndex = magicNumber;
  const recipeCards = doneRecipes.map((recipe, index) => {
    if (filter === 'all' || recipe.type === filter) {
      trybeIndex += 1;
      return (
        <RecipeCard
          key={ recipe.name + index }
          index={ trybeIndex }
          recipe={ recipe }
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
      <Header title="Done Recipes" btnProfile />
      <button
        onClick={ () => (buttonSetFilter('all')) }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => (buttonSetFilter('meal')) }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => (buttonSetFilter('drink')) }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      { recipeCards }
    </div>
  );
}

export default DoneRecipes;
