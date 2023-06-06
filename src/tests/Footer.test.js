import React from 'react';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';
import SearchProvider from '../context/SearchProvider';

describe('Testes para 90% de cobertura do Footer;', () => {
  it('Testando se os botões são renderizados em recipes:', () => {
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

    screen.getByTestId('drinks-bottom-btn');
    screen.getByTestId('meals-bottom-btn');
  });
  it('Testando se ao clicar no botão a pagina é redirecionada para /drinks:', () => {
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

    const drinksbtn = screen.getByTestId('drinks-bottom-btn');

    act(() => userEvent.click(drinksbtn));
    expect(history.location.pathname).toBe('/drinks');
  });
  it('Testando se ao clicar no botão a pagina é redirecionada para /meals:', () => {
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

    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    act(() => userEvent.click(mealsBtn));
    expect(history.location.pathname).toBe('/meals');
  });
});
