import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';
import SearchProvider from '../context/SearchProvider';

describe('Header', () => {
  test('Verifica se os itens de header são Renderizados se é possivel interagir com eles', () => {
    const history = createMemoryHistory();
    history.push('/recipes');

    render(
      <Router history={ history }>
        <RecipesProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </RecipesProvider>
      </Router>,
    );

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();

    const profileBtn = screen.getByAltText(/profile-icon/i);
    expect(profileBtn).toBeInTheDocument();

    const searchBtn = screen.getByAltText(/search-icon/i);

    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();

    userEvent.click(profileBtn);

    expect(history.location.pathname).toBe('/profile');
  });
});
