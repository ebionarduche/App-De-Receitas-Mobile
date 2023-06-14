import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const location = useLocation();
  const [renderRecipes, setRenderRecipes] = useState([]);
  // É necessário ter o Result tanto para meals quanto para drinks
  // a requisição é feita uma única vez
  const [MealsResult, setMealsResult] = useState([]);
  const [DrinksResult, setDrinksResult] = useState([]);
  const [mealsCategorys, setMealsCategorys] = useState([]);
  const [drinksCategorys, setDrinksCategorys] = useState([]);
  const [filterCategorys, setFilterCategorys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // É necessário fazer requisição para ambos endpoints
  const URL = ['https://www.themealdb.com/api/json/v1/1/search.php?s=',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='];

  const URL2 = ['https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'];

  const URL3 = location.pathname === '/meals'
    ? 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
    : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  const fetchRecipes = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const result = !data.drinks ? data.meals : data.drinks;
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategorysOnClick = async (valueButton) => {
    const twelve = 12;
    const response = await fetch(`${URL3}${valueButton}`);
    const data = await response.json();
    const result = location.pathname === '/meals' ? data.meals : data.drinks;
    setFilterCategorys(result);
    setIsLoading(false);
    setRenderRecipes(result.splice(0, twelve));
  };

  // Este evento está acontecendo uma única vez (array como segundo parâmetro)
  // portanto, é necessário carregar tantos os drinks quanto os meals
  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const [
          mealsResult,
          drinksResult,
          mlsCategorys,
          drnksCategorys,
        ] = await Promise.all([
          fetchRecipes(URL[0]),
          fetchRecipes(URL[1]),
          fetchRecipes(URL2[0]),
          fetchRecipes(URL2[1]),
        ]);
        setMealsResult(mealsResult);
        setDrinksResult(drinksResult);
        setMealsCategorys(mlsCategorys);
        setDrinksCategorys(drnksCategorys);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // fazer um toggle que vai chamar esse useEffect e o StartPage

  const initialState = useMemo(
    () => ({
      MealsResult,
      DrinksResult,
      isLoading,
      mealsCategorys,
      drinksCategorys,
      filterCategorys,
      fetchCategorysOnClick,
      renderRecipes,
      setRenderRecipes,
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }),
    [
      MealsResult,
      DrinksResult,
      isLoading,
      mealsCategorys,
      drinksCategorys,
      renderRecipes],
  );

  return (
    <RecipesContext.Provider value={ initialState }>
      <div>{children}</div>
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
