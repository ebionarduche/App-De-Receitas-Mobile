import { screen } from '@testing-library/react';
import { renderWithRouter } from './renderWith';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import App from '../App';

describe('Testando a renderização na tela', () => {
  it('testando email, passaword e button', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
