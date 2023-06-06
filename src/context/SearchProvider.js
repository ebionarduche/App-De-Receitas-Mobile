import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import SearchContext from './SearchContext';

export default function SearchProvider({ children }) {
  const location = useLocation();

  // Usando URL especifica baseado no path do route
  const URL = location.pathname === '/meals'
    ? 'https://www.themealdb.com/api/json/v1/1/'
    : 'https://www.thecocktaildb.com/api/json/v1/1/';

  const [searchResult, setSearchResult] = useState({});
  const searchApi = (search) => {
    fetch(`${URL}${search}`)
      .then((response) => response.json())
      .then((data) => setSearchResult(data));
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
