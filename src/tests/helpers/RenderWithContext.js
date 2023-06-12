import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import RecipesProvider from '../../context/RecipesProvider';
import SearchProvider from '../../context/SearchProvider';

const renderWithRouterAndContext = (component, route = '/meals') => {
  const history = createMemoryHistory();
  history.push(route);

  return render(
    <Router history={ history }>
      <RecipesProvider>
        <SearchProvider>
          {component}
        </SearchProvider>
      </RecipesProvider>
    </Router>,
  );
};

export default renderWithRouterAndContext;
