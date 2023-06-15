import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndContext from './helpers/RenderWithContext';
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';

describe('Teste Componente Meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = mockFetch;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa se a Tela de descrição é redirecionada atraves da tela Meals', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals');

    const corba = await screen.findByRole('button', { name: /corba/i });

    act(() => {
      userEvent.click(corba);
    });

    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('Testa se a Tela de descrição é redirecionada atraves da tela Meals', async () => {
    renderWithRouterAndContext(<App />, '/meals/52977');

    // const corba = screen.getByText(/corba/i);
    // expect(corba).toBeInTheDocument();

    const buttonShare = screen.getByRole('img', { name: /share icon/i });
    expect(buttonShare).toBeInTheDocument();

    const buttonFav = screen.getByRole('img', { name: /heart icon/i });
    expect(buttonFav).toBeInTheDocument();
  });
});
