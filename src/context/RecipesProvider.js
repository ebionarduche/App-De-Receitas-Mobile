import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const location = useLocation();

  const [RecipesResult, setRecipesResult] = useState([]);
  const [Categorys, setCategorys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const URL = location.pathname === '/meals'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const URL2 = location.pathname === '/meals'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const fetchRecipes = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const result = location.pathname === '/meals' ? data.meals : data.drinks;
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const [recipesResult, categorys] = await Promise.all([
          fetchRecipes(URL),
          fetchRecipes(URL2),
        ]);
        setRecipesResult(recipesResult);
        setCategorys(categorys);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllRecipes();
  }, []);

  const initialState = useMemo(() => ({
    RecipesResult,
    isLoading,
    Categorys,
  }), [RecipesResult, isLoading, Categorys]);

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
