import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const location = useLocation();

  const [RecipesResult, SetRecipesResult] = useState({});

  const URL = location.pathname === '/meals'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        SetRecipesResult(data.meals);
        console.log(RecipesResult);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
  }, []);

  const initialState = useMemo(() => ({
    RecipesResult,
  }), [RecipesResult]);

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
