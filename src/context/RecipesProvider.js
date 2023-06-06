import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const location = useLocation();

  const [RecipesResult, SetRecipesResult] = useState([]);
  const [isLoading, SetisLoading] = useState(true);

  const URL = location.pathname === '/meals'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        const result = location.pathname === '/meals' ? data.meals : data.drinks;
        SetRecipesResult(result);
        SetisLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
  }, []);

  const initialState = useMemo(() => ({
    RecipesResult,
    isLoading,
  }), [RecipesResult, isLoading]);

  return (
    <RecipesContext.Provider value={ initialState }>
      <div>
        { children }
      </div>
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
