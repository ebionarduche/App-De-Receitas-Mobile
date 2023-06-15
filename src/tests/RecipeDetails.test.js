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

const recipeDrink = [
  {
    alcoholicOrNot: 'Alcoholic',
    category: 'Cocktail',
    id: '178319',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    name: 'Aquamarine',
    nationality: '',
    type: 'drink',
  },
];

describe('Teste Componente RecipeDetails ', () => {
  const aquamarine = '/drinks/178319';
  const arrabiata = '/meals/52771';
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = mockFetch;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa se os Icons aparecem na tela', async () => {
    renderWithRouterAndContext(<App />, arrabiata);

    const buttonShare = screen.getByRole('img', { name: /share icon/i });
    expect(buttonShare).toBeInTheDocument();

    const buttonFav = screen.getByRole('img', { name: /heart icon/i });
    expect(buttonFav).toBeInTheDocument();
  });

  it('Testa logica do botão start/continue Recipe', async () => {
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
    renderWithRouterAndContext(<App />, arrabiata);
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

  it('Testa se o LocalStorage é atualizado quando clica em favorito [Meals]', async () => {
    localStorage.clear(); // Clearing localStorage before the test
    renderWithRouterAndContext(<App />, arrabiata);
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

  it('Testa se o LocalStorage é atualizado quando clica em favorito [Drinks- alcoholic]', async () => {
    localStorage.clear(); // Clearing localStorage before the test
    renderWithRouterAndContext(<App />, '/drinks/178319');
    await waitFor(() => screen.getByText(/aquamarine/i));

    const favoriteBtn = screen.getByRole('button', { name: /heart icon/i });

    act(() => {
      userEvent.click(favoriteBtn);
    });

    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(favoriteRecipes).toEqual(recipeDrink);

    act(() => {
      userEvent.click(favoriteBtn);
    });

    // Check if the recipe is removed from favorites
    favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toEqual([]);
  });

  it('Testa ao clicar no botão Start a rota é mudada [Meals]', async () => {
    const { history } = renderWithRouterAndContext(<App />, arrabiata);

    const buttonStart = screen.getByRole('button', { name: /start recipe/i });

    act(() => {
      userEvent.click(buttonStart);
    });

    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });

  it('Testa ao clicar no botão Start a rota é mudada [Drinks]', async () => {
    const { history } = renderWithRouterAndContext(<App />, aquamarine);

    const buttonStart = screen.getByRole('button', { name: /start recipe/i });

    act(() => {
      userEvent.click(buttonStart);
    });

    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });

  it('Testa ao clicar ', async () => {
    const clipboardCopyMock = jest.fn();
    const mockClipboard = {
      writeText: clipboardCopyMock,
    };
    Object.defineProperty(window, 'navigator', { value: { clipboard: mockClipboard }, configurable: true });

    renderWithRouterAndContext(<App />, aquamarine);

    // Mock do valor do link da janela
    const link = 'http://example.com';
    delete window.location;
    window.location = { href: link };

    // Verifica se a mensagem de cópia está vazia inicialmente
    const copyMessage = screen.queryByText(/Link copied!/i);
    expect(copyMessage).not.toBeInTheDocument();

    // Clica no botão de compartilhamento
    const shareButton = screen.getByRole('button', { name: /share icon/i });
    userEvent.click(shareButton);

    const copyMessage1 = screen.getByText(/Link copied!/i);
    expect(copyMessage1).toBeInTheDocument();

    // Verifica se a função de cópia para a área de transferência foi chamada com o link
    expect(clipboardCopyMock).toHaveBeenCalledWith(link);

    // Verifica se a mensagem de cópia foi atualizada
    expect(copyMessage1).toHaveTextContent(/Link copied!/i);
  });
});
