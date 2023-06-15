import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndContext from './helpers/RenderWithContext';
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';

const recipe = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
    inProgress: ['Lentils', 'Onion', 'Carrots'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: ['Hpnotiq","Pineapple Juice","Banana Liqueur'],
  },
];

describe('Teste Componente Meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = mockFetch;
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('Testa se a Tela de descrição é redirecionada atraves da tela Meals', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals');

    const corba = await screen.findByRole('button', { name: /corba/i });

    act(() => {
      userEvent.click(corba);
    });

    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('Testa se os elementos aparecem na tela', async () => {
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

  it('Testa se a Tela de descrição é redirecionada atraves da tela Drinks', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/drinks');

    const gg = await screen.findByRole('button', { name: /gg/i });

    act(() => {
      userEvent.click(gg);
    });

    expect(history.location.pathname).toBe('/drinks/15997');
  });

  it('Testa se os elementos aparecem na tela', async () => {
    renderWithRouterAndContext(<App />, '/drinks/15997');

    // const corba = screen.getByText(/corba/i);
    // expect(corba).toBeInTheDocument();

    const buttonShare = screen.getByRole('img', { name: /share icon/i });
    expect(buttonShare).toBeInTheDocument();

    const buttonFav = screen.getByRole('img', { name: /heart icon/i });
    expect(buttonFav).toBeInTheDocument();
  });

  it('Testa logica do botão start/continue Recipe', async () => {
    const aquamarine = '/drinks/178319';
    renderWithRouterAndContext(<App />, aquamarine);

    const buttonStart = screen.getByRole('button', { name: /start recipe/i });
    expect(buttonStart).toBeInTheDocument();
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipe));

    act(() => {
      // Remover o componente da árvore de componentes renderizados
      renderWithRouterAndContext(null, aquamarine);
    });

    // Renderizar o componente novamente com os dados atualizados
    renderWithRouterAndContext(<App />, aquamarine);

    const buttonContinue = screen.getByRole('button', { name: /continue recipe/i });
    expect(buttonContinue).toBeInTheDocument();
  });
});
