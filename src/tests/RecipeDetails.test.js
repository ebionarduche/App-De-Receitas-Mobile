import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/RenderWithContext';
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';

const recipe = [
  { id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg' },
];

describe('Teste Componente RecipeDetails ', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = mockFetch;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa se os Icons aparecem na tela', async () => {
    renderWithRouterAndContext(<App />, '/meals/52977');

    const buttonShare = screen.getByRole('img', { name: /share icon/i });
    expect(buttonShare).toBeInTheDocument();

    const buttonFav = screen.getByRole('img', { name: /heart icon/i });
    expect(buttonFav).toBeInTheDocument();
  });

  it('Testa logica do botão start/continue Recipe', async () => {
    const arrabiata = '/meals/52771';
    renderWithRouterAndContext(<App />, arrabiata);

    const buttonStart = screen.getByRole('button', { name: /start recipe/i });
    expect(buttonStart).toBeInTheDocument();
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipe));

    act(() => {
      // Remover o componente da árvore de componentes renderizados
      renderWithRouterAndContext(null, arrabiata);
    });

    // Renderizar o componente novamente com os dados atualizados
    renderWithRouterAndContext(<App />, arrabiata);

    const buttonContinue = screen.getByRole('button', { name: /continue recipe/i });
    expect(buttonContinue).toBeInTheDocument();
  });

  it('Testa se todos os detales das receitas estão sendo renderizados', async () => {
    renderWithRouterAndContext(<App />, '/meals/52771');
    await waitFor(() => {
      screen.getByText(/Spicy Arrabiata Penne/i);
      screen.getByText(/vegetarian/i);
      screen.getByTestId('instructions');
      screen.getByText(/1 pound penne rigate/i);
      screen.getByText(/4 cup olive oil/i);
      screen.getByText(/3 cloves garlic/i);
      screen.getByRole('img', { name: /recipe/i });
    });
  });

  it('Testa se todos os detales das receitas estão sendo renderizados', async () => {
    localStorage.clear(); // Clearing localStorage before the test
    renderWithRouterAndContext(<App />, '/meals/52771');
    await waitFor(() => screen.getByText(/Spicy Arrabiata Penne/i));

    const favoriteBtn = screen.getByRole('button', { name: /heart icon/i });

    act(() => {
      userEvent.click(favoriteBtn);
    });

    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(favoriteRecipes).toEqual(recipe);

    act(() => {
      userEvent.click(favoriteBtn);
    });

    // Check if the recipe is removed from favorites
    favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toEqual([]);
  });
});
//   it('Testa logica do botão start/continue Recipe', async () => {
//     const aquamarine = '/drinks/178319';
//     renderWithRouterAndContext(<App />, aquamarine);

//     const buttonStart = screen.getByRole('button', { name: /start recipe/i });
//     expect(buttonStart).toBeInTheDocument();
//     localStorage.setItem('inProgressRecipes', JSON.stringify(recipe));

//     act(() => {
//       // Remover o componente da árvore de componentes renderizados
//       renderWithRouterAndContext(null, aquamarine);
//     });

//     // Renderizar o componente novamente com os dados atualizados
//     renderWithRouterAndContext(<App />, aquamarine);

//     const buttonContinue = screen.getByRole('button', { name: /continue recipe/i });
//     expect(buttonContinue).toBeInTheDocument();
//   });
