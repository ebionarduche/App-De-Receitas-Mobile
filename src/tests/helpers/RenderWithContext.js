import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import RecipesProvider from '../../context/RecipesProvider';
import SearchProvider from '../../context/SearchProvider';

const renderWithRouterAndContext = (component, path = '/') => {
  const history = createMemoryHistory({ initialEntries: [path] });

  return {
    ...render(
      <Router history={ history }>
        <RecipesProvider>
          <SearchProvider>
            {component}
          </SearchProvider>
        </RecipesProvider>
        ,
      </Router>,
    ),
    history,
  };
};
export default renderWithRouterAndContext;
