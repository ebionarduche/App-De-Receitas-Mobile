import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndContext from './helpers/RenderWithContext';
import App from '../App';

const newDoneRecipes = [
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
    tags: [],
  },
];

describe('Teste Page Done Recipes', () => {
  it('Testa se os cards estão na tela', async () => {
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(JSON.stringify(newDoneRecipes)),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock;

    renderWithRouterAndContext(<App />, '/done-recipes');

    await waitFor(() => {
      expect(screen.findByText(/Spicy Arrabiata Penne/i));
      expect(screen.findByText(/Aquamarine/i));
    });
  });
});
