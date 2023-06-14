import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndContext from './helpers/RenderWithContext';
import App from '../App';
// import mockMeals from '../../cypress/mocks/meals';
// import mockCategories from '../../cypress/mocks/mealCategories';
import mockFetch from '../../cypress/mocks/fetch';

describe('Teste Componente Drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = mockFetch;
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Testa se os cards e btns de categoria estão na tela', async () => {
    renderWithRouterAndContext(<App />, '/drinks');
    await waitFor(() => {
      screen.getByRole('button', { name: /Ordinary Drink/i });
      screen.getByRole('button', { name: /Cocktail/i });
      screen.getByRole('button', { name: /Shake/i });
      screen.getByRole('button', { name: /Cocoa/i });
      screen.getByText(/GG/i);
      screen.getByText(/A1/i);
    }, { timeout: 2000 });
  });

  it('Testa o Filtro dos botões de categoria', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    const ordinary = await screen.findByRole('button', { name: /Ordinary Drink/i });

    act(() => {
      userEvent.click(ordinary);
    });

    await waitFor(() => {
      screen.getByRole('button', { name: /410 Gone/i });
      screen.getByRole('button', { name: /A Day at the Beach/i });
      screen.getAllByRole('button', { name: /3-Mile Long Island Iced Tea/i });
    });

    const cocktail = await screen.findByTestId('Cocktail-category-filter');

    act(() => {
      userEvent.click(cocktail);
    });
    await waitFor(() => {
      screen.getByRole('button', { name: /155 belmont/i });
      screen.getByRole('button', { name: /747 drink 747 drink/i });
      screen.getByRole('button', { name: /a gilligan's island a gilligan's island/i });
    });
    userEvent.click(cocktail);

    await waitFor(() => {
      screen.getByText(/GG/i);
      screen.getByText(/A1/i);
    });
  });

  // act(() => {
  //   userEvent.click(cocktail);
  // });
  // const all = screen.getByRole('button', { name: /all/i });

  // userEvent.click(all);

  // await waitFor(() => {
  //   screen.getByRole('button', { name: /Corba/i });
  // });

  // const dessert = await screen.findByRole('button', { name: /dessert/i });
  // userEvent.click(dessert);

  // await waitFor(() => {
  //   screen.getByRole('button', { name: /bakewell tart/i });
  //   screen.getByRole('button', { name: /banana Pancakes/i });
  //   screen.getAllByRole('button', { name: /battenberg Cake/i });
  // });

  // userEvent.click(dessert);

  // await waitFor(() => {
  //   screen.getByRole('button', { name: /Corba/i });
  // });
  it('Testa se ao cliclar no card é redirecionado para tela de detalhes', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/drinks');
    const gg = await screen.findByRole('button', { name: /gg/i });

    act(() => {
      userEvent.click(gg);
    });

    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
