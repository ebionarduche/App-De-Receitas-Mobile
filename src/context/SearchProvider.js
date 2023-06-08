import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import SearchContext from './SearchContext';

export default function SearchProvider({ children }) {
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();

  // Usando URL especifica baseado no path do route
  const URL = pathname === '/meals'
    ? 'https://www.themealdb.com/api/json/v1/1/'
    : 'https://www.thecocktaildb.com/api/json/v1/1/';

  const [searchResult, setSearchResult] = useState({});
  const searchApi = (search) => {
    console.log(`${URL}${search}`);
    fetch(`${URL}${search}`)
      .then((response) => response.json())
      .then((data) => {
        const result = pathname === '/meals' ? data.meals : data.drinks;
        setSearchResult(result);
        if (result.length === 1) {
          history.push(pathname === '/meals'
            ? `/meals/${result[0].idMeal}`
            : `/drinks/${result[0].idDrink}`);
        }
      });
  };

  const initialState = useMemo(() => ({
    searchResult,
    searchApi,
  }), [searchResult]);

  return (
    <SearchContext.Provider value={ initialState }>
      <div>
        { children }
      </div>
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
