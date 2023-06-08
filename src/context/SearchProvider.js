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
  const [searched, setSearched] = useState(false);
  const searchApi = (search) => {
    fetch(`${URL}${search}`)
      .then((response) => response.json())
      .then((data) => {
        const result = pathname === '/meals' ? data.meals : data.drinks;
        if (!result) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
          return;
        }
        setSearchResult(result);
        if (result.length === 1) {
          history.push(pathname === '/meals'
            ? `/meals/${result[0].idMeal}`
            : `/drinks/${result[0].idDrink}`);
          setSearched(false);
        } else { setSearched(true); }
      });
  };

  const initialState = useMemo(() => ({
    searchResult,
    searchApi,
    searched,
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
