import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndContext from './helpers/RenderWithContext';
import App from '../App';
// import mockMeals from '../../cypress/mocks/meals';
// import mockCategories from '../../cypress/mocks/mealCategories';
import mockFetch from '../../cypress/mocks/fetch';

describe('Teste Componente Meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = mockFetch;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa se os cards estão tela e se é filtrado por categoria', async () => {
    renderWithRouterAndContext(<App />, '/meals');
    await waitFor(() => {
      screen.getByRole('button', { name: /beef/i });
      screen.getByRole('button', { name: /breakfast/i });
      screen.getByRole('button', { name: /dessert/i });
      screen.getByRole('button', { name: /goat/i });
      screen.getByText(/Corba/i);
      screen.getByText(/Poutine/i);
    });

    const beef = await screen.findByRole('button', { name: /beef/i });
    userEvent.click(beef);

    await waitFor(() => {
      screen.getByRole('button', { name: /beef and mustard pie beef and mustard pie/i });
      screen.getByRole('button', { name: /beef and oyster pie beef and oyster pie/i });
      screen.getAllByRole('button', { name: /beef stroganoff/i });
    });

    const breakfast = await screen.findByRole('button', { name: /breakfast/i });
    userEvent.click(breakfast);

    await waitFor(() => {
      screen.getByRole('button', { name: /breakfast potatoes/i });
      screen.getByRole('button', { name: /full English Breakfast/i });
      screen.getAllByRole('button', { name: /english Breakfast/i });
    });

    const all = screen.getByRole('button', { name: /all/i });

    userEvent.click(all);

    await waitFor(() => {
      screen.getByRole('button', { name: /Corba/i });
    });

    const dessert = await screen.findByRole('button', { name: /dessert/i });
    userEvent.click(dessert);

    await waitFor(() => {
      screen.getByRole('button', { name: /bakewell tart/i });
      screen.getByRole('button', { name: /banana Pancakes/i });
      screen.getAllByRole('button', { name: /battenberg Cake/i });
    });

    userEvent.click(dessert);

    await waitFor(() => {
      screen.getByRole('button', { name: /Corba/i });
    });
  });
  it('Testa se ao cliclar no card é redirecionado para tela de detalhes', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals');
    console.log('Esse é o history ======>', history);

    const corba = await screen.findByRole('button', { name: /corba/i });

    act(() => {
      userEvent.click(corba);
    });

    expect(history.location.pathname).toBe('/meals/52977');
  });
});
