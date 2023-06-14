import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndContext from './helpers/RenderWithContext';
import App from '../App';

// const newDoneRecipes = [
//   {
//     id: '52771',
//     type: 'meal',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];

describe('DoneRecipes', () => {
  // const spicyArrabiataPenne = 'Spicy Arrabiata Penne';

  // beforeEach(() => {
  //   const localStorageMock = {
  //     getItem: jest.fn().mockReturnValue(JSON.stringify(newDoneRecipes)),
  //     setItem: jest.fn(),
  //     removeItem: jest.fn(),
  //     clear: jest.fn(),
  //   };
  //   global.localStorage = localStorageMock;
  // });

  // afterEach(() => {
  //   global.localStorage = undefined;
  // });

  it('renderiza a página de Receitas Feitas com os cards de receitas', () => {
    renderWithRouterAndContext(<App />, '/done-recipes');
    screen.getByRole('img', { name: /spicy arrabiata penne/i });
  });
});
