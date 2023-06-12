// import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
// import renderWithRouterAndContext from './helpers/RenderWithContext';
// import App from '../App';
// import mockMeals from '../../cypress/mocks/meals';

// describe('Teste Componente Meals', () => {
//   beforeEach(() => {
//     jest.spyOn(global, 'fetch');
//     global.fetch = jest.fn().mockResolvedValue({
//       json: jest.fn().mockResolvedValue(mockMeals),
//     });
//   });
//   afterEach(() => {
//     global.fetch.mockRestore();
//   });
//   it('Testa se os cards e categorias  estão tela', () => {
//     renderWithRouterAndContext(<App />);
//     waitFor(() => {
//       screen.getByAltText(/corba/i);
//       screen.getByAltText(/burek/i);
//     });

//     waitFor(() => {
//       screen.getByTestId('Beef-category-filter');
//       screen.getByTestId('Chicken-category-filter');
//       screen.getByTestId('Dessert-category-filter');
//       screen.getByTestId('Goat-category-filter');
//     });
//   });
//   it('Testa os botões de category', async () => {
//     renderWithRouterAndContext(<App />);
//     const beefBtn = screen.getByTestId('Beef-category-filter');

//     await act(async () => {
//       userEvent.click(beefBtn);
//       await waitFor(() => {
//         screen.findByAltText(/beef and mustard pie/i);
//       });
//     });
//   });
// });
