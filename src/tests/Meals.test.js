import React from 'react';
import { waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouterAndContext from './helpers/RenderWithContext';
import App from '../App';
import mockMeals from '../../cypress/mocks/meals';

describe('Teste Componente Meals', () => {
  it('Testa se os cards estão tela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMeals),
    });
    renderWithRouterAndContext(<App />);
    await waitFor(() => {
    });

    global.fetch.mockRestore();
  });
});
