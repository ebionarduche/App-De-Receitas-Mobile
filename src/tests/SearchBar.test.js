import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWith';
import App from '../App';

describe('Testante barra de busca', () => {
  it('Pesquisa por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    expect(history.location.pathname).toBe('/meals');

    const showSeachButton = screen.getByTestId('search-top-btn');
    userEvent.click(showSeachButton);

    const searchInput = screen.getByTestId('search-input');
    const ingredienteRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'soap');
    userEvent.click(ingredienteRadio);
    userEvent.click(searchButton);
    userEvent.click(nameRadio);
    userEvent.click(searchButton);
    userEvent.type(searchInput, 'a');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton);
  });
});
