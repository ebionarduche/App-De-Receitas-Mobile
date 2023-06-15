import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndContext from './helpers/RenderWithContext';
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';

describe('Teste Page RecipeDetails', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = mockFetch;
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Testa se os cards de meals renderizam na tela', async () => {
    renderWithRouterAndContext(<App />, '/meals/52771');
    await waitFor(() => {
      screen.getByText(/Spicy Arrabiata Penne/i);
      screen.getByText(/Vegetarian/i);
      screen.getByTestId('instructions');
      screen.getByText(/1 pound penne rigate/i);
      screen.getByText(/1 tin chopped tomatoes/i);
    });
  });

  it('', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals/52771');
    const startBtn = screen.getByTestId('start-recipe-btn');
    act(() => {
      userEvent.click(startBtn);
    });

    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });

  it('Testa se os cards de drinks renderizam na tela e se é alcoólica ou não', async () => {
    renderWithRouterAndContext(<App />, '/drinks/178319');
    await waitFor(() => {
      screen.getByText(/Aquamarine/i);
      screen.getByText(/Alcoholic/i);
      screen.getByTestId('instructions');
      screen.getByText(/2 oz hpnotiq/i);
      screen.getByText(/1 oz banana liqueur/i);
    });
  });

  it('', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/drinks/178319');
    const startBtn = screen.getByTestId('start-recipe-btn');
    act(() => {
      userEvent.click(startBtn);
    });

    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });
});
